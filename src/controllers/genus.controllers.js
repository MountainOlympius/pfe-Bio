const genusModels = require('../models/genus')

const { isNumber } = require('../utils/validators')

const getGenuses = (pool) => {
    const { selectGenuses } = genusModels(pool)
    const itemsPerPage = 10

    return async (request, response) => {
        let { page = 1 } = request.query

        page = !isNumber(page) || page <= 0 ? 1 : page

        const genuses = await selectGenuses(itemsPerPage, (page - 1) * itemsPerPage)

        response.json({
            ok: true,
            data: genuses.map((genus) => {
                return {
                    ...genus,
                    criteria: genus.criteria.filter((cr) => cr.id),
                }
            }),
        })
    }
}

const getGenusWithDetails = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const getSpeciesOfGenus = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const postGenus = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const postSpecies = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const postGenusCriteria = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const editGenus = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const deleteGenus = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const deleteGenusCriteria = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

const deleteSpecies = (pool) => {
    return async (request, response) => {
        response.json({ ok: false })
    }
}

module.exports = (pool) => {
    return {
        getGenuses: getGenuses(pool),
        getGenusWithDetails: getGenusWithDetails(pool),
        getSpeciesOfGenus: getSpeciesOfGenus(pool),
        postGenus: postGenus(pool),
        postGenusCriteria: postGenusCriteria(pool),
        postSpecies: postSpecies(pool),
        editGenus: editGenus(pool),
        deleteGenus: deleteGenus(pool),
        deleteGenusCriteria: deleteGenusCriteria(pool),
        deleteSpecies: deleteSpecies(pool)
    }
}