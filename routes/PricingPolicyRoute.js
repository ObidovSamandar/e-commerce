const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("privacy-policy",{
        activePath:"/privacy-policy",
        userInfo:req.user
    })
})

module.exports ={
    path:"/privacy-policy",
    router
}