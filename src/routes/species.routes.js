const express = require('express')
const formidableMiddleware = require('express-formidable-v2')

const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')
const SpeciesControllers = require('../controllers/species.controllers')

const SpeciesRouter = (pool) => {

    const router = express.Router()
    const {
		getSpecies,
		searchSpecies,
		getSpeciesWithDetails,
		createSpecies,
		editSpecies,
		deleteSpecies,
		addSpeciesCriteria,
		deleteSpeciesCriteria,
        uploadSpeciesImage,
        deleteSpeciesImages
	} = SpeciesControllers(pool)

    router.get('/', getSpecies)
    router.get('/search', searchSpecies)
    router.get('/:id', getSpeciesWithDetails)

    router.post('/', AuthenticatedOnly, AdminOnly, createSpecies)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editSpecies)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deleteSpecies)

    router.post('/:id/criteria', AuthenticatedOnly, AdminOnly, addSpeciesCriteria)
    router.delete('/:id/criteria', AuthenticatedOnly, AdminOnly, deleteSpeciesCriteria)

    router.delete('/:id/images', AuthenticatedOnly, AdminOnly, deleteSpeciesImages)
    router.post('/:id/images', AuthenticatedOnly, AdminOnly, formidableMiddleware({
        multiples: true,
        maxFiles: 3
    }), uploadSpeciesImage)

    return router
}

module.exports = SpeciesRouter