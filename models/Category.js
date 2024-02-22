const mongoose=require('mongoose')

const Categoryschema = new mongoose.Schema({
    
    cat_name:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    }
},{timestamps:true})
// creat Collection
 
const Categorymodel=mongoose.model('Category',Categoryschema)
module.exports=Categorymodel