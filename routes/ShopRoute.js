const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("shop-2")
})

module.exports ={
    path:"/shop-2",
    router
}