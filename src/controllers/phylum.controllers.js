const phylumModel = require('../models/phylum')
const { isNumber } = require('../utils/validators')

const getAllPhylums = (pool) => {
    const { selectPhylums } = phylumModel(pool)

    return async (request, response) => {
        const phylumsList = await selectPhylums()

        response.json({ ok: false, data: phylumsList})
    }
}

const getPhylumDetails = (pool) => {
    const { selectPhylumWithDetails } = phylumModel(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) {
            return response.status(404).json({ ok: false })
        }

        const phylum = await selectPhylumWithDetails(Number(id), 1)

        if (!phylum) {
            return response.status(404).json({ ok: false })
        }

        response.json({ ok: true, data: phylum })
    }
}

const getPhylumFamilies = (pool) => {
    const { selectFamiliesOfPhylum } = phylumModel(pool)

    return async (request, response) => {
        const { id } = request.params
        const { last = 0 } = request.query

        if (!isNumber(id) || Number(id) <= 0 || !isNumber(last)) {
            return response.status(404).json({ ok: false })
        }

        const families = await selectFamiliesOfPhylum(Number(id), last || 0)

        response.json({ ok: true, data: families })
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
        deletePhylum: deletePhylum(pool),
        getPhylumFamilies: getPhylumFamilies(pool)
    }
}