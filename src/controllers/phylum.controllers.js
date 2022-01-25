const phylumModel = require('../models/phylum')
const { isNumber, checkAllowedFields, checkRequiredFields } = require('../utils/validators')

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

        const phylum = await selectPhylumWithDetails(Number(id))

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
    const { insertPhylum } = phylumModel(pool)

    return async (request, response) => {
        const { body } = request
        const errors = []

        errors.push(...checkAllowedFields(body, ['name', 'description']))
        errors.push(...checkRequiredFields(body, ['name']))

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const { id } = await insertPhylum(body.name, body.description)
            response.json({ ok: true, data: { id }})
        } catch (err) {
            const errors = []

            if (err.constraint == 'phylum_name_key') {
                errors.push('phylum_already_exist')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok: false, errors})
        } 

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