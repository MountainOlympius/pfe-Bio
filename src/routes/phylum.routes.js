const express = require('express')

const phylumControllers = require('../controllers/phylum.controllers')
const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')

const PhylumRouter = (pool) => {
    const router = express.Router()
    const { getAllPhylums, getPhylumDetails, postPhylum, editPhylum, deletePhylum, getPhylumFamilies } = phylumControllers(pool)

    router.get('/', getAllPhylums)
    router.get('/:id', getPhylumDetails)
    router.get('/:id/families', getPhylumFamilies)

    router.post('/', AuthenticatedOnly, AdminOnly, postPhylum)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editPhylum)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deletePhylum)

    return router
}

module.exports = PhylumRouter