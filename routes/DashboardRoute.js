const router = require("express").Router()
const {verifyToken} = require("../modules/jwt")
const {findByIdUser,updateProduct} = require('../models/UsersModel')

function checkUser(req,res,next){
    let user = verifyToken(req.cookies?.token)
    if(!user){
        res.redirect('/login')
        return 0
    }
    next()
}
router.get('/', checkUser ,async (req, res)=>{
    let user = await findByIdUser(req.user.id)
    res.render("dashboard",{
        activePath:"/dashboard",
        userInfo:req?.user,
        cartProducts: user?.products
    })
})

router.post('/', async (req,res)=>{
    try {
        let user = await findByIdUser(req.user.id)
        let {quantity} = req.body
        let products = [...user.products.reverse()]
        for(let i=0; i<products.length; i++){
            products[i].quantity =Number(quantity[i])
        }
        await updateProduct(user.products.reverse())
        res.render('dashboard',{
            activePath:"/dashboard",
            userInfo:req.user,
            cartProducts: user.products
        })
    } catch (e) {
        
    }
})

router.get('/delete/:proname', async (req,res)=>{
    try {
        let user = await findByIdUser(req.user.id)
        user.products=user.products.filter(val => val.proname!=req.params.proname)
        await updateProduct(user.products)
        res.redirect('/dashboard')
    } catch (e) {
        // console.log(e)
    }
})

router.get('/products', async (req,res)=>{
    let user = await findByIdUser(req?.user?.id)
    if(user){
        res.send({length:user.products.length})
    }else{
        res.send({length:0})
    }
})
module.exports ={
    path:"/dashboard",
    router
}