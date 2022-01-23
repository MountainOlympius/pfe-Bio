const bcrypt = require('bcrypt')

const hash = (data) => {
    return bcrypt.hashSync(data, 10)
}

const checkHash = (data, hash) => {
    return bcrypt.compareSync(data, hash)
}

module.exports = {
    hash,
    checkHash,
}
