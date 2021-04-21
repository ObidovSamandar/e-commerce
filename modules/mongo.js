const mongoose = require('mongoose')

require('dotenv').config()

const MongoBaseUrl = process.env.MONGODB_URI || "mongodb://localhost/orgoShop"

async function BaseConnection() {
    return await mongoose.connect(MongoBaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

module.exports = BaseConnection