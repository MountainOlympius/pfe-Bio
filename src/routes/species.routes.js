const express = require('express')
const SpeciesControllers = require('../controllers/species.controllers')

const SpeciesRouter = (pool) => {
    const router = express.Router()
    const { getSpecies, searchSpecies, getSpeciesWithDetails } = SpeciesControllers(pool)

    router.get('/', getSpecies)
    router.get('/search', searchSpecies)
    router.get('/:id', getSpeciesWithDetails)

    // Get List of species
    // Search for species
    // Get a species with details
    // Add Species
    // Edit Species
    // Delete Species 
    // Add delete images
    // delete images

    return router
}

module.exports = SpeciesRouter