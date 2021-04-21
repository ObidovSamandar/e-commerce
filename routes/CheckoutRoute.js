const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("checkout")
})

module.exports ={
    path:"/checkout",
    router
}