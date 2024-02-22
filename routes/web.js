const express=require('express')
const route=express.Router()
const Frontcontroller = require('../controllers/Frontcontroller')
const Blogcontroller = require('../controllers/Blogcontroller')
const Categorycontroller = require('../controllers/Categorycontroller')
const Contactcontroller = require('../controllers/Contactcontroller')
const auth=require('../middleware/auth')


//front interface for user
route.get('/index',Frontcontroller.index)
route.get('/about',Frontcontroller.about)
route.get('/contact',Frontcontroller.contact)
route.get('/blog',Frontcontroller.blog)
route.get('/detail',Frontcontroller.blogdetail)

//admin login
route.get('/',Frontcontroller.index)
route.get('/login',Frontcontroller.login)
route.post('/verifylogin',Frontcontroller.verifylogin)
route.get('/register',auth,Frontcontroller.register)
route.get('/logout',auth,Frontcontroller.logout)
//for verifymail
route.get('/verifyadmin',Frontcontroller.verifymail)
route.get('/admin/dashboard',auth,Frontcontroller.dashboard)
//forgetpassword frontend part
route.get('/forgetpassword',Frontcontroller.forgetview)
route.post('/forgetpassword',Frontcontroller.forgetlink)
//update password
route.get('/resetlink',Frontcontroller.resetlink)
route.post('/resetlink',Frontcontroller.updatepass)
//changepassword
route.post('/changepassword',auth,Frontcontroller.changep)
//blogcontroller
route.get('/admin/display',auth,Blogcontroller.Displayblog)
route.get('/admin/Category',auth,Categorycontroller.Category)
route.post('/insertblog',auth,Blogcontroller.insertblog)
//userinsert
route.post('/admininsert',auth,Frontcontroller.admininsert)
route.get('/front/detail/:id',Frontcontroller.blogdetail)
//display view edit delete
route.get('/admin/view/:id',auth,Blogcontroller.blogView)
route.get('/admin/edit/:id',auth,Blogcontroller.blogEdit)
route.post('/blogupdate/:id',auth,Blogcontroller.blogupdate)
route.get('/admin/delete/:id',auth,Blogcontroller.blogDelete)
route.get('/admin/contact',auth,Contactcontroller.adinfo)
route.get('/admin/adinfoview/:id',auth,Contactcontroller.adinfoview)
//category
route.post('/insertblogcat',auth,Categorycontroller.insertcat)
route.get('/admin/cat/view/:id',auth,Categorycontroller.catview)
route.get('/admin/cat/edit/:id',auth,Categorycontroller.catedit)
route.post('/admin/cat/update/:id',auth,Categorycontroller.catupdate)
route.get('/admin/cat/delete/:id',auth,Categorycontroller.catdelete)
route.get('/front/catdetail/:id',Categorycontroller.catdetail)
//contact
route.post('/inform',auth,Contactcontroller.contact)
module.exports=route