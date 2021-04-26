const router = require("express").Router()

router.get('/', (req, res)=>{
    res.render("pricing",{
        activePath:"/pricing",
        userInfo:req.user
    })
})

module.exports ={
    path:"/pricing",
    router
}