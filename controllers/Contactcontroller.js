const Contactmodel=require('../models/contact')
class Contactcontroller{
  static contact=async(req,res)=>{
    try {
        //console.log(req.body)
        const result=await Contactmodel.create(req.body)
        await result.save()
        res.redirect('/contact')
    } catch (error) {
        console.log(error)
    }
  }
  static adinfo=async(req,res)=>{
    try {
      const id=req.admin._id;
        const recinfo=await Contactmodel.find().sort({_id:-1})
        res.render('admin/adinfo',{c:recinfo,id:id})
    } catch (error) {
        console.log(error)
    }
  }
  static adinfoview=async(req,res)=>{
    try {
        const infoid=await Contactmodel.findById(req.params.id)
        res.render('admin/adinfoview',{c:infoid})
    } catch (error) {
        console.log(error)
    }
  }
}
module.exports=Contactcontroller