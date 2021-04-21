const router = require("express").Router()
const Joi = require('joi')
const { addUser } = require('../models/UsersModel')
const { generateHash } = require("../modules/bcrypt")

router.get('/', (req, res)=>{
    res.render("register")
})



router.post('/', async (req, res)=>{
    try {
        const {username, mobile_number, password, gender} = req.body
        await addUser(username, mobile_number,generateHash(password), gender)
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        req.flash('error_msg','Please fill all fields!!')
        res.render('register')
    }
})



module.exports ={
    path:"/register",
    router
}
