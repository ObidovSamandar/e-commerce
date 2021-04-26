const router = require("express").Router()
const Joi = require('joi')
const moment = require("moment")
const {findByIdUser,updateProduct,updatePurchaseStatus,upadteBillingDetails,deleteAllProducts} = require('../models/UsersModel')
const BillingValidation = new Joi.object({
    firstname:Joi.string()
        .min(4)
        .max(32)
        .error(new Error('First Name  is incorrect'))
        .required(),
    lastname:Joi.string()
        .alphanum()
        .min(4)
        .max(32)
        .trim()
        .error(new Error('Last Name is incorrect'))
        .required(),
    address:Joi.string()
        .trim()
        .error(new Error('Address is incorrect'))
        .required(),
    towncity:Joi.string()
        .trim()
        .error(new Error('Town/City is incorrect'))
        .required(),
    postcode:Joi.number()
        .min(100000)
        .max(999999)
        .error(new Error('Postcode length must be 6'))
        .required(),
    total:Joi.number()
        .min(0)
        .required()
        .error(new Error("Total sum not found"))

})

const paymentValidation = new Joi.object({
    cardnumber:Joi.string()
        .min(19)
        .error(new Error('Card number is incorrect'))
        .required(),
    cvccode:Joi.string()
        .min(3)
        .min(4)
        .error(new Error('CvC code is incorrect'))
        .required()
})
router.get('/', async (req, res)=>{
    let user = await findByIdUser(req.user.id)
    res.render("checkout",{
        activePath:"/checkout",
        userInfo:req.user,
        userProdcuts:user.products
    })
})


router.post('/', async(req,res)=>{
    try {
        let paymentMethod = req.body['radio-group']
        const {firstName, lastName, address, townOrCity, postcode, total} = req.body
        let validateObj = {firstname:firstName, lastname:lastName,address,towncity:townOrCity,postcode,total}
        let resultValidation = await BillingValidation.validateAsync(validateObj)
        let incardnum=req.body.cardnumber,uncvccodenum=req.body.cvccode
        if(paymentMethod=='paypal'){
            let {cardnumber,cvccode} = await paymentValidation.validateAsync({cardnumber:req.body.cardnumber,cvccode:req.body.cvccode})
            uncvccodenum=cvccode,
            incardnum = cardnumber
        }
        let user = await findByIdUser(req.user.id)
        let userproducts = user.products;
        for(let val of userproducts){
            val.purchased = true
        }
        let status1 = {status:true, date:moment.now(), totalsum:total, products:user.products}
        user.products = user.products.filter(pro => pro.purchased!=true)
        await updateProduct(user.products)
        let updateon1 = await updatePurchaseStatus(req.user.id,status1)
        let status2 = {
            firstname:resultValidation.firstName,
            lastname:resultValidation.lastName,
            address:resultValidation.address,
            towncity:resultValidation.townOrCity,
            postcode:resultValidation.postcode,
            paymentMethod:{
                method:paymentMethod,
                cardnumber:incardnum,
                cvccode:uncvccodenum
            }
        }
        let updateon2 = await upadteBillingDetails(req.user.id,status2)
        req.flash('paymentsucc_msg','Thank you for purchasing!')
        res.redirect('/checkout')
    } catch (e) {
        req.flash('paymenterr_msg',e.message)
        res.redirect('/checkout')
    }

})


module.exports ={
    path:"/checkout",
    router
}