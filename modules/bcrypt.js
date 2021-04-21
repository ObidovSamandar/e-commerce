const bcrypt = require('bcrypt')

function generateHash(data) {
    let saltedHash = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(data,saltedHash)
    return hash
}

function  comapareHash(data,encrypt) {
    return bcrypt.compareSync(data,encrypt)
}


module.exports ={
    generateHash,
    comapareHash
}