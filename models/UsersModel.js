const BaseConnections = require('../modules/mongo')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    phone_number:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        trim:true
    },
    products:[
        {
            proname:{
                type:String,
                trim:true
            },
            price:{
                type:Number,
            },
            quantity:{
                type:Number,
            },
            backimg:{
                type:String,
                trim:true
            },
            purchased:{
                type:Boolean,
                default:false
            }
        }
    ],
    purchased:[
        {
            status:{
                type:Boolean,
            },
            date:{
                type:Number
            },
            totalsum:{
                type:Number
            },
            products:[
                {
                    proname:{
                        type:String,
                        trim:true
                    },
                    price:{
                        type:Number,
                    },
                    quantity:{
                        type:Number,
                    },
                    backimg:{
                        type:String,
                        trim:true
                    },
                    purchased:{
                        type:Boolean,
                        default:false
                    }
                }
            ]
        }
    ],
    billingdetails:[
        {
            firstname:{
                type:String,
                trim:true
            },
            lastname:{
                type:String,
                trim:true
            },
            address:{
                type:String,
                trim:true
            },
            towncity:{
                type:String,
                trim:true
            },
            postcode:{
                type:String,
                trim:true
            },
            paymentMethod:{
                method:{
                    type:String,
                    trim:true
                },
                cardnumber:{
                    type:Number,
                    default:0
                },
                cvccode:{
                    type:Number,
                    default:0
                }
            }
        }
    ]
})

async function UserModel() {
    let db = await BaseConnections()
    return await db.model('users',usersSchema)
}

async function addUser(name,phone_number,password,gender){
    let db = await UserModel()
    return await db.create({
        username:name,
        phone_number,
        password,
        gender
    })
}

async function findUser(username){
    let db = await UserModel()
    let obj;
    if(typeof username!='string'){
        obj = {phone_number:username}
    }else{
        obj = {username:username}
    }
    return await db.findOne(obj)
}

async function  updatePassword(objectId,data) {
    let db = await UserModel()
    return await db.findOneAndUpdate({_id:objectId},{password:data})
}

async function findByIdUser(id){
    let db = await UserModel();
    return await db.findOne({_id:id})
}
async function updateProduct(pros){
    let db = await UserModel()
    return await db.updateOne({products:pros})
}
async function deleteProduct(objid) {
    let db = await UserModel()
    return await db.deleteOne({_id:objid})
}

async function updatePurchaseStatus(objid,purInfo) {
    let db = await UserModel()
    return await db.findOneAndUpdate({_id:objid},{$push:{purchased:purInfo}})
}
async function upadteBillingDetails(objid,billdetail) {
    let db = await UserModel()    
    return await db.findOneAndUpdate({_id:objid},{billingdetails:billdetail})
}



module.exports ={
    addUser,
    findUser,
    updatePassword,
    findByIdUser,
    updateProduct,
    deleteProduct,
    updatePurchaseStatus,
    upadteBillingDetails
}