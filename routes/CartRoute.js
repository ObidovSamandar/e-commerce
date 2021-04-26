const router = require("express").Router()
router.get('/', (req, res)=>{
    res.render("cart",{
        activePath:"/cart",
        userInfo:req.user
    })
})

router.post('/product',  (req,res)=>{
    res.send({
        ok:true
    })
})

module.exports ={
    path:"/cart",
    router
}