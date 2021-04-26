const router = require("express").Router()



router.get('/', (req, res)=>{
    res.render("team",{
        activePath:"/team",
        userInfo:req.user
    })
})

module.exports ={
    path:"/team",
    router
}