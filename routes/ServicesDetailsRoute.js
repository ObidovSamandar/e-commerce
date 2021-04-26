const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("services-details",{
        activePath:"/services-details",
        userInfo:req.user
    })
})

module.exports ={
    path:"/services-details",
    router
}