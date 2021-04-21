const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("services")
})

module.exports ={
    path:"/services",
    router
}