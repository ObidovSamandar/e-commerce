const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("gallery-details",{
        activePath:"/gallery-details",
        userInfo:req.user
    })
})

module.exports ={
    path:"/gallery-details",
    router
}