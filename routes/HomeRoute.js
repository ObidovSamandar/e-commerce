const router = require("express").Router()
const {findByIdUser} = require('../models/UsersModel')

// const Usermiddleware = require('../middlewares/Usermiddleware')
// router.use(Usermiddleware)

router.get('/', async (req, res)=>{
    // let user = await findByIdUser(req.user.id)
    res.render("index",{
        activePath:"/",
        userInfo:req.user,
        // cartProducts:user.products
    })
})

module.exports ={
    path:"/",
    router
}