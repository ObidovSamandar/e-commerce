const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("blog-1")
})

module.exports ={
    path:"/blog-1",
    router
}