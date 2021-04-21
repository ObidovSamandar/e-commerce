const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("gallery-details")
})

module.exports ={
    path:"/gallery-details",
    router
}