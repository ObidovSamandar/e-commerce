const router = require("express").Router()
const Joi = require('joi')
const { addUser } = require('../models/UsersModel')
const { generateHash } = require("../modules/bcrypt")
const AuthMiddleware = require('../middlewares/Authmiddleware')

router.use(AuthMiddleware)

router.get('/',(req, res)=>{
    res.render("register",{
        activePath:"/register",
        userInfo:req.user
    })
})

const RegistrationValidation = new Joi.object({
    username:Joi.string()
        .alphanum()
        .min(6)
        .max(16)
        .trim()
        .error(new Error('Username is incorrect'))
        .required(),
    phone_number:Joi.number()
        .min(10000)
        .max(999999999999)
        .error(new Error('Phone number is incorrect'))
        .required(),
    gender:Joi.string()
        .trim()
        .error(new Error('Gender is incorrect'))
        .required(),
    password:Joi.string()
        .min(8)
        .max(32)
        .trim()
        .error(new Error('Password is incorrect'))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})


router.post('/', async (req, res)=>{
    try {
        const {username, phone_number, password, gender} = await RegistrationValidation.validateAsync(req.body)
        await addUser(username, phone_number,generateHash(password), gender)
        req.flash('success_msg','Registered successfully!')
        res.redirect('/login')
    } catch (e) {
        if(e.code==11000){
            e.message ='User already exist'
        }
        req.flash('error_msg',e.message)
        res.redirect('/register')
    }
})



module.exports ={
    path:"/register",
    router
}
