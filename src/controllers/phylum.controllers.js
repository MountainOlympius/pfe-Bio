const phylumModel = require('../models/phylum')

const getAllPhylums = (pool) => {
    const { selectPhylums } = phylumModel(pool)

    return async (request, response) => {
        const phylumsList = await selectPhylums()

        response.json({ ok: false, data: phylumsList})
    }
}

const getPhylumDetails = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This feature hasn\'t been implemented yet.'})
    }
}

const postPhylum = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This feature hasn\'t been implemented yet.'})
    }
}

const editPhylum = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This feature hasn\'t been implemented yet.'})
    }
}

const deletePhylum = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This feature hasn\'t been implemented yet.'})
    }
}

module.exports = (pool) => {
    return {
        getAllPhylums: getAllPhylums(pool),
        getPhylumDetails: getPhylumDetails(pool),
        postPhylum: postPhylum(pool),
        editPhylum: editPhylum(pool),
        deletePhylum: deletePhylum(pool)
    }
}