const {verifyToken} = require("../modules/jwt")

module.exports = function (req,res,next) {
    let resultToken = verifyToken(req.cookies?.token)
    if(resultToken){
        req.user = resultToken
    }
    next()
}