const jwt = require('jsonwebtoken')

require('dotenv').config()
function generateToken(data) {
    return jwt.sign(data,process.env.SECRET_WORD)
}

function verifyToken(token){
    try {
      return jwt.verify(token,process.env.SECRET_WORD)  
    } catch (e) {
        return false
    }
}

module.exports ={
    generateToken,
    verifyToken
}