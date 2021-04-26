const router = require("express").Router()


router.get('/', (req, res)=>{
    res.render("gallery",{
        activePath:"/gallery",
        userInfo:req.user
    })
})

module.exports ={
    path:"/gallery",
    router
}