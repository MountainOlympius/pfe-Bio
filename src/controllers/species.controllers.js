const SpeciesModels = require('../models/species')
const { isNumber } = require('../utils/validators')

// Get List of species
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

module.exports = (pool) => {
    return {
        getSpecies: getSpecies(pool),
    }
}