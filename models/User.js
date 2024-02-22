const mongoose=require('mongoose')
//schema
const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    verify:{
        type:String,
        default:'0'
    },
    token:{
        type:String,
        default:''
    }
},{timestamps:true})
//collection
const Usermodel=new mongoose.model('userdata',Userschema)
module.exports=Usermodel