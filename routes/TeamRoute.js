const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("team")
})

module.exports ={
    path:"/team",
    router
}