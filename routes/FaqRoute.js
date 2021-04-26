const router = require("express").Router()
router.get('/', (req, res)=>{
    res.render("faq",{
        activePath:"/faq",
        userInfo:req.user
    })
})

module.exports ={
    path:"/faq",
    router
}