const { default: mongoose } = require('mongoose')
const Usermodel=require('../models/User')
const Blogmodel = require('../models/Blog')
const Category=require('../models/Category')
const Categorymodel = require('../models/Category')
const bcrypt=require('bcrypt')
var cloudinary = require('cloudinary').v2;
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const Random=require('randomstring')

cloudinary.config({ 
    cloud_name:'durbsc1w3', 
    api_key:'212474534226764', 
    api_secret:'mqEOx-aQoMKES4-wRCdP9KHTl8M'
  });
class Frontcontroller{

static index = async(req,res)=>{
   try {
     const blog = await Blogmodel.find().sort({_id:-1}).limit(6)
     res.render('index',{b:blog})
   } catch (error) {
     console.log(error)
   }
}
static about=async(req,res)=>{
     res.render('about')
}
static contact=async(req,res)=>{
   res.render('contact')
}
static blog=async(req,res)=>{
     try {
        const data=await Blogmodel.find().sort({_id:-1})
        res.render('blog',{d:data})
     } catch (error) {
        console.log(error)
     }
}
static login=async(req,res)=>{
    try {
     res.render('login',{message:req.flash('success')})
    } catch (error) {
     console.log(error)
    }
}
static blogdetail=async(req,res)=>{
     try {
        const detail=await Blogmodel.findById(req.params.id)
        const recblog=await Blogmodel.find().sort({_id:-1}).limit(6)
        const cat=await Categorymodel.find().sort({_id:-1}).limit(3)
        res.render('detail',{b:recblog,c:cat,d:detail})
     } catch (error) {
        console.log(error)
     }
}
static dashboard=async(req,res)=>{
    try {
      const{name,email,_id,image}=req.admin
     res.render('admin/dashboard',{message:req.flash('success'),n:name,e:email,id:_id,img:image})
    } catch (error) {
     console.log(error)
    }
}
static register=async(req,res)=>{
     try {
      const id=req.admin._id;
      res.render('admin/adminregister',{message:req.flash('error'),id:id})
     } catch (error) {
      console.log(error)
     }
 }
 static admininsert=async(req,res)=>{
     try {
         // console.log(req.body)
         const {name,email,password,cpassword}=req.body
         const file=req.files.image
         const admin=await Usermodel.findOne({email:email})
         if(admin){
              req.flash('error','Email Alreay Exist')
              res.redirect('/register')
         }else{
            if(password === cpassword){
               const hashpassword=await bcrypt.hash(password,10)
               const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
                  folder: 'profileimg'
               })
               const admindata=new Usermodel({
                  name:name,
                  email:email,
                  password:hashpassword,
                  image:{
                     public_id:myimage.public_id,
                     url:myimage.url
                  }
               })
             admindata.save()
             this.sendemail(name,email,admindata._id);
            req.flash('success','Please Verify your email & Successfully Login')
           res.redirect('/')
            }else{
             req.flash('error','Password & Confirm Password not Match')
             res.redirect('/register')
            }
            
         }
         
     } catch (error) {
          console.log(error)
     }
 }
 static verifylogin=async(req,res)=>{
   try {
     // console.log(req.body)
     const {email,password}=req.body
     const verify=await Usermodel.findOne({email:email})
     if(verify){
       const ismatch=await bcrypt.compare(password,verify.password)
       if(ismatch){
         if(verify.verify === '1'){
            const token=jwt.sign({ID:verify._id},'SHIVANIJSSNNNNHUYRT')
            res.cookie('token',token)
            res.redirect('/admin/dashboard')
         }else{
         req.flash('success','Please Verify your email & Successfully Login')
         res.redirect('/')
         }
       }else{
         req.flash('success','Please chek UserID & Password')
         res.redirect('/')
       }
     }else{
      req.flash('success','Please enter register Email')
      res.redirect('/')
     }
   } catch (error) {
      console.log(error)
   }
 }
 static logout=async(req,res)=>{
   try {
      res.clearCookie('token')
      res.render('login',{message:req.flash('success')})
   } catch (error) {
      console.log(error)
   }
 }
//  verify Emailcode for Admin
static sendemail=async(name,email,admin_id)=>{
try {
   let transpoter=await nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      auth:{
         user:"onlinemath85@gmail.com",
         pass:"xfmupoczzbuijpri"
      }
   })
   let info=transpoter.sendMail({
      from:"text@gmail.com",
      to:email,
      subject:"For Email Verification",
      html:'<b>'+name+' </b>, please click here to <a href="http://localhost:2000/verifyadmin?id='+admin_id+'">verify</a> Your Email By Blog RSGITECH' // html body
   });
   
} catch (error) {
   console.log(error)
}
}
//email link access
static verifymail=async(req,res)=>{
   try {
          await Usermodel.findByIdAndUpdate(req.query.id,{
              verify:"1"
      })
      res.render('admin/verifymail')
   } catch (error) {
      console.log(error)
   }
}
static forgetview=async(req,res)=>{
   res.render('forgetpassword',{message:req.flash('success')})
}
static forgetlink=async(req,res)=>{
   try {
     const email=req.body.email
     const admindata=await Usermodel.findOne({email:email})
     if(admindata){
          if(admindata.verify == 1){
          const random=Random.generate();
          const nd=await Usermodel.findByIdAndUpdate(admindata._id,{
           token:random
          })
          this.forgetpe(nd.name,nd.email,random)
          req.flash('success','Password Reset Link Has Been Sent To Email')
          res.redirect('/forgetpassword')
          }else{
            req.flash('success','Please Verify Your Email')
            res.redirect('/forgetpassword')
          }
     }else{
      req.flash('success','Please Enter The Regiserted Email')
      res.redirect('/forgetpassword')
     }
   } catch (error) {
      console.log(error)
   }
}
//forget password Emailcode 
static forgetpe=async(name,email,token)=>{
   let transpoter=await nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      auth:{
         user:"onlinemath85@gmail.com",
         pass:"xfmupoczzbuijpri"
      }
   })
   let info=transpoter.sendMail({
      from:"text@gmail.com",
      to:email,
      subject:"For Reset Password",
      html:'<b>'+name+' </b>, please click here to <a href="http://localhost:2000/resetlink?token='+token+'">Change Password</a> By Blog RSGITECH' // html body
   });
}
static resetlink=async(req,res)=>{ 
   const token = req.query.token
   const tokendata = await Usermodel.findOne({token:token})
   if(tokendata){
      res.render('passlink')
   }else{
    res.render('404')
   }
   
}
static updatepass=async(req,res)=>{
       const token=req.query.token
       const pass=req.body.password
       const hp=await bcrypt.hash(pass,10)
       const result=await Usermodel.updateOne({token:token},{$set:{password:hp}});
       const updateresult=await Usermodel.updateOne({token:token},{$set:{token:''}});
       res.redirect('/')
}
static changep=async(req,res)=>{
   try {
      //console.log(req.body)
      const { op, np, cp,id } = req.body
     const admin=await Usermodel.findById(id)
     const ismatch=await bcrypt.compare(op,admin.password)
     if(!ismatch){
      req.flash('success','Your Old Password Is Incorect')
      res.redirect('/admin/dashboard')
     }else{
        if(np === cp){
          const hashp=await bcrypt.hash(np,10)
          await Usermodel.findByIdAndUpdate(id,{
            password:hashp
          })
          req.flash('success','Your Password Has Been Changed Successfully')
          res.redirect('/admin/dashboard')
        }else{
         req.flash('success',' New Password & Confirm Password does not match')
         res.redirect('/admin/dashboard')
        }
     }
   } catch (error) {
      console.log(error)
   }
}
}
module.exports=Frontcontroller