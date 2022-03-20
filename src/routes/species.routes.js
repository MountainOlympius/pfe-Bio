const express = require('express')

const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')
const SpeciesControllers = require('../controllers/species.controllers')

const SpeciesRouter = (pool) => {
    const router = express.Router()
    const { getSpecies, searchSpecies, getSpeciesWithDetails, createSpecies, editSpecies, deleteSpecies, addSpeciesCriteria } = SpeciesControllers(pool)

    router.get('/', getSpecies)
    router.get('/search', searchSpecies)
    router.get('/:id', getSpeciesWithDetails)

    router.post('/', AuthenticatedOnly, AdminOnly, createSpecies)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editSpecies)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deleteSpecies)

    router.post('/:id/criteria', AuthenticatedOnly, AdminOnly, addSpeciesCriteria)

    return router
}

module.exports = SpeciesRouter