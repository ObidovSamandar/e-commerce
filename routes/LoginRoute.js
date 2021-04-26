const router = require("express").Router()
const Joi = require('joi')
const { findUser } = require('../models/UsersModel')
const { comapareHash } = require("../modules/bcrypt")
const { generateToken,verifyToken } = require("../modules/jwt")




router.get('/',(req,res,next)=>{
    let resultToken = verifyToken(req.cookies?.token)
    
    if(resultToken){
        res.redirect('/dashboard')
        return 0
    }
    next()
},(req,res)=>{
    res.render("login",{
        activePath:"/login",
        userInfo:req.user
    })
})
const LoginValidation = new Joi.object({
    login:Joi.string()
        .error(new Error('Usernam or Phone number is incorrect'))
        .required(),
    password:Joi.string()
        .min(8)
        .max(32)
        .trim()
        .error(new Error('Password is incorrect'))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

router.post('/', async (req,res)=>{
    try {
        let { login, password} = await LoginValidation.validateAsync(req.body)
        if(!isNaN(Number(login))){
            login = Number(login)
        }
        let user = await findUser(login)
        if(!user) throw new Error('User not found')
        let verifyPassword = comapareHash(password,user.password)
        if(!verifyPassword) throw new Error('Password is incorrect')
        const giveToken = generateToken({
            id:user._id,
            username:user.name,
            gender:user.gender
        })
        res.cookie('token',giveToken).redirect('/dashboard')
    } catch (e) {
        console.log(e)
        req.flash('error_msg',e.message)
        res.redirect('/login')
    }
})

module.exports = {
    path: "/login",
    router
}