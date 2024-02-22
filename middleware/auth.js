const jwt=require('jsonwebtoken')
const Usermodel=require('../models/User')


const checkadminauth=async(req,res,next)=>{
    //console.log('hello middleware')
    const {token} = req.cookies
     if(!token){
          req.flash('success','Unauthorized Admin')
          res.redirect('/')
     }else{
       const data= jwt.verify(token,'SHIVANIJSSNNNNHUYRT')
       //console.log(data)
       const admin= await Usermodel.findOne({_id:data.ID})
       //console.log(admin)
       req.admin=admin
       next()
     }
}

module.exports=checkadminauth