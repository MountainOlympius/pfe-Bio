const FileType = require('file-type')

const checkMime = (expected, mime) => {
    if(expected instanceof RegExp && !expected.test(mime)) return false
    else if (typeof expected === 'string' && expected !== mime) return false
    else return true
}

const getType = async (path) => await FileType.fromFile(path)

module.exports = {
    checkMime,
    getType
}