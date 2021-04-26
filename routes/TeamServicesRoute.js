const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("terms-of-service",{
        activePath:"/terms-of-service",
        userInfo:req.user
    })
})

module.exports ={
    path:"/terms-of-service",
    router
}