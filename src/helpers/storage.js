const path = require('path')
const fs = require('fs')
const { getType, checkMime } = require('../utils/files')
const { randomStr } = require('../utils/generic')

const deleteFileLocaly = (p) => {
    if (fs.existsSync(p)) fs.unlinkSync(p)
}

const uploadFileLocaly = async (request, tmpPath, expectedMime) => {
    const mediaDir = process.env.media_local_path
    const {ext, mime} = await getType(tmpPath)
    
    if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir)
    
    if (!checkMime(expectedMime, mime)) {
        deleteFileLocaly(tmpPath)
        return null
    }
    
    const fileName = `${randomStr(25)}.${ext}`
    const fileUrl = new URL(process.env.media_host || request.protocol + '://' + request.get('host') + '/')
    const filePath = path.join(mediaDir, fileName)

    fileUrl.pathname = path.join(process.env.media_url_path || '/media/', fileName)

    fs.copyFileSync(tmpPath, filePath)
    deleteFileLocaly(tmpPath)

    return {url: fileUrl.href, local_path: filePath }
}

module.exports = {
    uploadFileLocaly,
    deleteFileLocaly
}