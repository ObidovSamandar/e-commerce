const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("terms-of-service")
})

module.exports ={
    path:"/terms-of-service",
    router
}