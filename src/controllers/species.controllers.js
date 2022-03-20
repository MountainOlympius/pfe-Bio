const SpeciesModels = require('../models/species')
const { isNumber } = require('../utils/validators')

// Search for species
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

module.exports = (pool) => {
    return {
        getSpecies: getSpecies(pool),
        searchSpecies: searchSpecies(pool),
    }
}