const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("privacy-policy")
})

module.exports ={
    path:"/privacy-policy",
    router
}