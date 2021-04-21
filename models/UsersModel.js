const BaseConnections = require('../modules/mongo')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name:{
        type:String,
        unique:true,
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
    }
})

async function UserModel() {
    let db = await BaseConnections()
    return await db.model('users',usersSchema)
}

async function addUser(name,number,password,gender){
    let db = await UserModel()
    return await db.create({
        name,
        phone_number:number,
        password,
        gender
    })
}

module.exports ={
    addUser
}