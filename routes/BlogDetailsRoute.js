const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("blog-details",{
        activePath:"/blog-details",
        userInfo:req.user
    })
})

module.exports ={
    path:"/blog-details",
    router
}