const mongoose=require('mongoose')
//schema
const Contactschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})
//collection
const Contactmodel=new mongoose.model('contact',Contactschema)
module.exports=Contactmodel