const SpeciesModels = require('../models/species')
const { isNull } = require('../utils/generic')
const { isNumber } = require('../utils/validators')

// Get a species with details
// Add Species
// Edit Species
// Delete Species 
// Add delete images
// delete images

const getSpecies = (pool) => {
    const itemsPerPage = 10
    const { selectSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        let { page } = request.query

        page = isNumber(page) && Number(page) >= 1 ? page : 1

        const species = await selectSpecies(itemsPerPage, (page - 1 ) * itemsPerPage)

        return response.json({ ok : true, data: species})
    }
}

const searchSpecies = (pool) => {
    const { searchFromSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        let { query } = request.query

        const species = await searchFromSpecies(query)

        return response.json({ ok:false , data: species })
    }
}

// Add species images to response
const getSpeciesWithDetails = (pool) => {
    const { selectSpeciesWithDetails } = SpeciesModels(pool)

    return async (request, response) => {
        let { id } = request.params

        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        const species = await selectSpeciesWithDetails(id)
        const responseBody = { ok: species ? true : false }
        if (species) responseBody.data = species

        return response.json(responseBody)
    }
}

module.exports = (pool) => {
    return {
        getSpecies: getSpecies(pool),
        searchSpecies: searchSpecies(pool),
        getSpeciesWithDetails: getSpeciesWithDetails(pool)
    }
}