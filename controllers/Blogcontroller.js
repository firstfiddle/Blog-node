const Blogmodel= require('../models/Blog')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name:'durbsc1w3', 
    api_key:'212474534226764', 
    api_secret:'mqEOx-aQoMKES4-wRCdP9KHTl8M'
  });

class Blogcontroller{
    static Displayblog=async(req,res)=>{
        const id=req.admin._id;
        const data= await Blogmodel.find()
        res.render('admin/display',{d:data,id:id})    
    }
    static insertblog=async(req,res)=>{
        try {
            // console.log(req.files.image)
            // data inset kare me shotcut but form k name wali field or schema wali feild same honi chahiye
            const file=req.files.image
            const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'Blogimg'
            })
            const result= new Blogmodel({
                title:req.body.title,
                des:req.body.des,
                image: {
                    public_id:myimage.public_id,
                    url:myimage.url
                }
            })
            await result.save()
            res.redirect('/admin/display')
            //console.log(myimage)
            // const result =await Blogmodel.create(req.body)
            //  result.save()
            //  res.redirect('/admin/display')
        } catch (error) {
            console.log(error)
        }
    }
    static blogView = async(req,res)=>{
        try {
            const result= await Blogmodel.findById(req.params.id)
           // console.log(result)
           res.render('admin/view',{v:result})
        } catch (error) {
            console.log(error)
        }
       
    }
    static blogEdit =async(req,res)=>{
        try {
            const result=await Blogmodel.findById(req.params.id)
            res.render('admin/edit',{e:result})
        } catch (error) {
            console.log(error)
        }
    }
    static blogupdate= async(req,res)=>{
        try {
            const {title,des,image}=req.body
            if(req.files){
                const blog = await Blogmodel.findById(req.params.id)
            const imageid=blog.image.public_id 
            await  cloudinary.uploader.destroy(imageid)     // coludinary se imge delete karna k code
            const file=req.files.image
            const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'Blogimg'
            })
            var data = {
                title:title,
                des:des,
                image: {
                    public_id:myimage.public_id,
                    url:myimage.url
                }
            }
            }else{
              var data = {
                title:title,
                des:des
              }
            }
            await Blogmodel.findByIdAndUpdate(req.params.id, data)
            res.redirect('/admin/display')
        } catch (error) {
            console.log(error)
        }
    }
    static blogDelete=async(req,res)=>{
        try {
            //server cloudinary se delte karna ka code
            const blog=await Blogmodel.findById(req.params.id)
            const imageid=blog.image.public_id
            // coludinary se imge delete karna k code
            await  cloudinary.uploader.destroy(imageid)

            await Blogmodel.findByIdAndDelete(req.params.id)
           // const del = await Blogmodel.findByIdAndDelete(req.params.id)
           res.redirect('/admin/display')
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports=Blogcontroller