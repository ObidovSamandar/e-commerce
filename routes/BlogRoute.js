const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("blog-1",{
        activePath:"/blog-1",
        userInfo:req.user
    })
})

module.exports ={
    path:"/blog-1",
    router
}