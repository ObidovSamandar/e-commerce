const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("services",{
        activePath:"/services",
        userInfo:req.user
    })
})

module.exports ={
    path:"/services",
    router
}