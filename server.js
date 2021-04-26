const express = require('express')
const app = express()
const glob = require('glob')
const cookieparser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')

// PORT settings
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`SERVER RUNNIG ON http://localhost:${PORT}`))

// Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(express.static('assets'))

// Configs
app.set("view engine", "ejs")

// expression session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(flash())

// Flash Messages Settings
app.use((req,res,next)=>{
    res.locals.error_msg=req.flash('error_msg')
    res.locals.success_msg=req.flash('success_msg')
    res.locals.paymentsucc_msg=req.flash('paymentsucc_msg')
    res.locals.paymenterr_msg=req.flash('paymenterr_msg')
    next()
})

const Usermiddleware = require('./middlewares/Usermiddleware')

// Router settings
glob('**/*Route.js',{realpath:true} ,(err, files)=>{
    files.forEach(eachRouter => {
        let RouterDetails = require(eachRouter)
        app.use(RouterDetails.path, RouterDetails.router)
    })
})
app.use(Usermiddleware)



