const BaseConnections = require('../modules/mongo')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    newprice:{
        type:Number,
        required:true,

    },
    oldprice:{
        type:Number,
        required:true
    },
    sale:{
        type:Boolean,
        required:true
    },
    imagePath:{
        type:String,
        trim:true,
    },
    isVegetable:{
        status:{
            type:Boolean,
            default:false
        },
        leefygreen:{
            type:Boolean,
            default:false
        },
        marrow:{
            type:Boolean,
            default:false
        },
        root:{
            type:Boolean,
            default:false
        }
    },
    isFruit:{
        status:{
            type:Boolean,
            default:false
        },
        tropical:{
            type:Boolean,
            default:false
        },
        melons:{
            type:Boolean,
            default:false
        },
        citrus:{
            type:Boolean,
            default:false
        }
    }
})

async function productsModel() {
    let db = await BaseConnections()
    return await db.model('product',productsSchema)
}

async function addProduct(name,newprice,oldprice=0,sale=false,imagePath='/img/top-products/top-products-1.jpg'){
    let db = await productsModel()
    if(!sale){
        oldprice = 0
    }
    return await db.create({
        name,
        newprice,
        oldprice,
        sale,
        imagePath,
    })
}

async function allProduct() {
    let db = await productsModel()
    return await db.find({})
}

async function findProduct(proname){
    let db = await productsModel()
    return await db.findOne({name:proname})
}

async function isFruit(proname,infofruit) {
    let db = await productsModel()
    return await db.findOneAndUpdate({name:proname},{isFruit:infofruit})
}

async function isVegetable(proname,infoveg){
    let db = await productsModel()
    return await db.findOneAndUpdate({name:proname},{isVegetable:infoveg})
}

async function getAllVegetables(something) {
    let db = await productsModel()
    return await db.find(something)
}
module.exports ={
    addProduct,
    allProduct,
    findProduct,
    isFruit,
    isVegetable,
    getAllVegetables
}