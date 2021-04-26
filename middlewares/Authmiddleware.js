const {verifyToken} = require("../modules/jwt")

module.exports = function (req,res,next) {
    let resultToken = verifyToken(req.cookies?.token)
    if(resultToken){
        res.redirect('/login')
        return 0;
    }
    next()
}