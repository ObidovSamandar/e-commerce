const router = require("express").Router()
const {allProduct, addProduct,isFruit,isVegetable,getAllVegetables} = require('../models/ProductsModel')
const {findByIdUser,updateProduct} = require('../models/UsersModel')
// let category
router.get('/',async (req, res)=>{
    try {
        let products;
        function mainSearcher(isvegorfruit,search,condition) {
                let obj = {}
                obj[isvegorfruit]= { "$exists": true }
                obj[search]=condition
                return obj
        }

        let { productType } = req.query
        if(productType=='all' || !productType){
            products = await allProduct()
        }
        if(productType=='vegetable'){
            products = await getAllVegetables(mainSearcher("isVegetable","isVegetable.status",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="fruit"){
            products = await getAllVegetables(mainSearcher("isFruit","isFruit.status",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="leefygreen"){
            products = await getAllVegetables(mainSearcher("isVegetable","isVegetable.leefygreen",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="marrow"){
            products = await getAllVegetables(mainSearcher("isVegetable","isVegetable.marrow",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="root"){
            products = await getAllVegetables(mainSearcher("isVegetable","isVegetable.root",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="tropical"){
            products = await getAllVegetables(mainSearcher("isFruit","isFruit.tropical",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="melons"){
            products = await getAllVegetables(mainSearcher("isFruit","isFruit.melons",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        if(productType=="citrus"){
            products = await getAllVegetables(mainSearcher("isFruit","isFruit.citrus",true),
            function (err, data) {
                if (err) throw new Error(err);
                return res.json(data);
            })
        }
        // productType = productType.toLocaleUpperCase()
        res.render("shop",{
            activePath:"/shop",
            userInfo:req.user,
            products,
            activeProduct: productType.toLocaleUpperCase()
        })
    } catch (e) {
        console.log(e)
        let products = await allProduct()
        req.flash('erro_msg',e.message)
        res.render('shop',{
            activePath:"/shop",
            userInfo:req.user,
            products
        })
    }
})


  
router.post('/pro',  async (req,res)=>{
    try {
        let user = await findByIdUser(req.user.id)
        let isProductExist = user.products.find(product=>{
            return product.proname.trim().toLowerCase()==req.body.proname.trim().toLowerCase()
        })
        if(isProductExist){
            isProductExist.quantity = Number(isProductExist.quantity)+Number(req.body.quantity)
            await updateProduct(user.products)
        }else{
             user.products.push(req.body)
             await updateProduct(user.products)
        }
        res.send({
            ok:true
        })
    } catch (e) {
        res.send({
            ok:false
        })
    }
})



module.exports ={
    path:"/shop",
    router
}