const express= require('express')
const app = express()
const port=2000
const web=require('./routes/web')
const Connectdb=require('./db/Connectdb')
const fileUpload=require('express-fileupload')
var cloudinary = require('cloudinary');
const session=require('express-session')
const flash=require('connect-flash')
const cookieparser=require('cookie-parser')

//toekn get karna k liye middle ware me
app.use(cookieparser())
//databs connect
Connectdb()
//message 
app.use(session({ // is se messgee waha pr ayega
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUinitialized: false,
}));

//flase message  message dikhega waha pr
app.use(flash())

// for file upload
app.use(fileUpload({ useTempFiles: true }));

// url data 
app.use(express.urlencoded({extended:false}))

//css image link
app.use(express.static('public'))

//ejs set-up
app.set('view engine', 'ejs')

//route
app.use('/',web)

//server creat
app.listen(port, ()=>{
    console.log(`server is running localhost: ${port}`)
})