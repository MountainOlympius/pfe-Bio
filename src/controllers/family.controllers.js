const familyModels = require('../models/family')
const { isNumber } = require('../utils/validators')

const getFamilies = (pool) => {
    const { selectFamilies } = familyModels(pool)
    const itemsPerPage = 10

    return async (request, response) => {
        let { page = 1 } = request.query

        page = !isNumber(page) || page <= 0 ? 1 : page

        const families = await selectFamilies(itemsPerPage * page, (page - 1) * itemsPerPage)

        response.json({
            ok: true,
            data: families.map((family) => {
                return {
                    ...family,
                    criteria: (family.criteria || []).filter((cr) => cr.id),
                }
            }),
        })
    }
}

const getFamilyDetails = (pool) => {
    const { selectFamilyWithDetails } = familyModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) {
            return response.status(404).json({ ok: false })
        }

        let family = await selectFamilyWithDetails(id)

        // Clean data : remove [{id : null}]
        family.criteria = (family.criteria || []).filter(cr => cr.id)
        family.genuses = (family.genuses || []).filter(genus => genus.id)
        family.genuses.criteria = (family.genuses.criteria || []).filter(cr => cr.id)

        response.json({ ok: true, data: family})
    }
}

const getFamilyGenuses = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const postFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const editFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const deleteFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

module.exports = (pool) => {
    return {
        getFamilies: getFamilies(pool),
        getFamilyDetails: getFamilyDetails(pool),
        getFamilyGenuses: getFamilyGenuses(pool),
        postFamily: postFamily(pool),
        editFamily: editFamily(pool),
        deleteFamily: deleteFamily(pool)
    }
}