const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("shop-details")
})

module.exports ={
    path:"/shop-details",
    router
}