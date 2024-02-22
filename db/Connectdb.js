// Using Node.js `require()`
const mongoose = require('mongoose')
const livedb='mongodb+srv://veerprajapati173:Ravi2003@cluster0.1mpf028.mongodb.net/Blogpro?retryWrites=true&w=majority&appName=Cluster0'
const Connectdb = ()=>{
     return mongoose.connect(livedb)

     .then(()=>{
        console.log("connected successfully")
     })
     .catch((error)=>{
        console.log(error)
     })
}

module.exports=Connectdb