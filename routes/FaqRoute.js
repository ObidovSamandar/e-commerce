const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("faq")
})

module.exports ={
    path:"/faq",
    router
}