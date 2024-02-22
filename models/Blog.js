const mongoose=require('mongoose')
//schema

const Blogschema= new mongoose.Schema({
      title:{
        type:String,
        required:true
      },
      des:{
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
      }
},{timestamps:true})
// creat collection
const Blogmodel=mongoose.model('Blog',Blogschema)
module.exports=Blogmodel


