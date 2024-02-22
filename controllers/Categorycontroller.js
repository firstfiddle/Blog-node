const Categorymodel=require('../models/Category')
const Usermodel = require('../models/User')
const Blogmodel=require('../models/Blog')
const { blog } = require('./Frontcontroller')
class Categorycontroller{

    static Category=async(req,res)=>{
        try {
            const id=req.admin._id;
            const data=await Categorymodel.find()
            res.render('admin/category',{d:data,id:id})
        } catch (error) {
            console.log(error)
        }
    }
    static insertcat= async(req,res)=>{
        try {
            const result=new Categorymodel({
                cat_name:req.body.cat,
                des:req.body.des
            })
            await result.save()
            res.redirect('/admin/Category')
        } catch (error) {
            console.log(error)
        }
    }
    static catview=async(req,res)=>{
       try {
        const data= await Categorymodel.findById(req.params.id)
        res.render('admin/catview',{d:data})
       } catch (error) {
        console.log(error)
       }
    }
    static catedit=async(req,res)=>{
        try {
            const data= await Categorymodel.findById(req.params.id)
            res.render('admin/catedit',{d:data})
        } catch (error) {
            console.log(error)
        }
    }
    static catupdate=async(req,res)=>{
        try {
            //console.log('hello')
            const {cat,des}=req.body
           await Categorymodel.findByIdAndUpdate(req.params.id,{
                cat_name:cat,
                des:des
            })
            res.redirect('/admin/category')
        } catch (error) {
            console.log(error)
        }
    }
    static catdelete=async(req,res)=>{
        await Categorymodel.findByIdAndDelete(req.params.id)
        res.redirect('/admin/category')
    }
    static catdetail=async(req,res)=>{
       const detail=await Categorymodel.findById(req.params.id)
       const reccat=await Categorymodel.find().sort({_id:-1}).limit(6)
       const blog=await Blogmodel.find().sort({_id:-1}).limit(4)
        res.render('catdetail',{d:detail,c:reccat,b:blog})
    }
}
module.exports=Categorycontroller