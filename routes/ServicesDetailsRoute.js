const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("services-details")
})

module.exports ={
    path:"/services-details",
    router
}