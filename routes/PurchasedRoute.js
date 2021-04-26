const router = require('express').Router()
const {findByIdUser} = require('../models/UsersModel')

router.get('/', async  (req,res)=>{
    let user = await findByIdUser(req.user.id)
    // console.log(user.purchased[0].products)
    // console.log(user.purchased[0].totalsum)
    // console.log(user.purchased[0].date)
    res.render('purchased',{
        activePath:"/purchasedpro",
        userInfo:req.user,
        purchasedProducts:user.purchased
    })
})

module.exports ={
    path:"/purchasedpro",
    router
}