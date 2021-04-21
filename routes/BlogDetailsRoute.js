const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("blog-details")
})

module.exports ={
    path:"/blog-details",
    router
}