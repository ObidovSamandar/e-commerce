const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("about",{
        activePath:"/about",
        userInfo:req.user
    })
})

module.exports ={
    path:"/about",
    router
}