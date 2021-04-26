const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("contact",{
        activePath:"/contact",
        userInfo:req.user
    })
})

module.exports ={
    path:"/contact",
    router
}