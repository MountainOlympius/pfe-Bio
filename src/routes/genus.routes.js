const express = require('express')

const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')
const genusControllers = require('../controllers/genus.controllers')

// TODO : Maybe implement search

const GenusRouter = (pool) => {
    const router = express.Router()
    const {
        getGenuses,
        getSpeciesOfGenus,
        getGenusWithDetails,
        postGenus,
        postGenusCriteria,
        // postSpecies,
        editGenus,
        deleteGenus,
        deleteGenusCriteria,
        // deleteSpecies,
        searchForGenuses
    } = genusControllers(pool)

    router.get('/', getGenuses) 
    router.get('/search', searchForGenuses) 
    router.get('/:id', getGenusWithDetails) 
    router.get('/:id/species', getSpeciesOfGenus)

    router.post('/', AuthenticatedOnly, AdminOnly, postGenus)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editGenus)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deleteGenus)

    router.post('/:id/criteria', AuthenticatedOnly, AdminOnly, postGenusCriteria)
    router.delete('/:id/criteria/:criteriaId', AuthenticatedOnly, AdminOnly, deleteGenusCriteria)

    // router.post('/:id/species', AuthenticatedOnly, AdminOnly, postSpecies)
    // router.delete('/:id/species/:speciesId', AuthenticatedOnly, AdminOnly, deleteSpecies)

    return router
}

module.exports = GenusRouter