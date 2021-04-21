const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("pricing")
})

module.exports ={
    path:"/pricing",
    router
}