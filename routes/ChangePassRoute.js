const router = require("express").Router()
const Joi = require('joi')
const { findUser,updatePassword } = require("../models/UsersModel")
const { generateHash } = require("../modules/bcrypt")
const { generateToken } = require('../modules/jwt')
require('dotenv').config()


router.get('/', (req, res)=>{
    res.render("changepass",{
        activePath:"/change",
        userInfo:req.user
    })
})
const recoveryValidation = new Joi.object({
    login:Joi.string()
        .error(new Error('Username or phonenumber  is incorrect'))
        .required(),
    password:Joi.string()
        .min(8)
        .max(32)
        .trim()
        .error(new Error('Password is incorrect'))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    password2:Joi.string()
        .min(8)
        .max(32)
        .trim()
        .error(new Error('Passwor2 is incorrect'))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

router.post('/', async (req,res)=>{
    try {
        let { login, password, password2} = await recoveryValidation.validateAsync(req.body)
        if(!isNaN(Number(login))){
            login = Number(login)
        }
        let user = await findUser(login)
        if(!user) throw new Error('User is not found')
        if(password!=password2) throw new Error('Password is not same')
        let userinfo = await updatePassword(user._id,generateHash(password))
        req.flash('success_msg','Password successfully changed!')
        console.log(userinfo)
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        req.flash('error_msg',e.message)
        res.redirect('/change')
    }
})

module.exports ={
    path:"/change",
    router
}



