const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("gallery")
})

module.exports ={
    path:"/gallery",
    router
}