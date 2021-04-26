const router = require("express").Router()
const {findProduct} = require('../models/ProductsModel')
let productInfo 
router.get('/:proname', async (req, res)=>{
    try {
        productInfo = await findProduct(req.params.proname.trim())
        res.redirect('/shopDetails')
    } catch (e) {
        console.log(e)
    }
})

router.get('/',(req,res)=>{
    let newpro = productInfo
    res.render('shopDetails',{
        activePath:"/shop-details",
        userInfo:req.user,
        product:newpro
    })
})
router.post('/',(req,res)=>{
    res.redirect('/shopDetails')
})

module.exports ={
    path:"/shopDetails",
    router
}