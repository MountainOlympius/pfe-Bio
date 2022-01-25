const express = require('express')

const familyControllers = require('../controllers/family.controllers')
const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')

// TODO : implement adding family images (figures)
// TODO : Implement Add & delete criteria

const FamilyRouter = (pool) => {
    const router = express.Router()
    const { getFamilies, getFamilyDetails, getFamilyGenuses, postFamily, editFamily, deleteFamily } = familyControllers(pool)

    router.get('/', getFamilies)
    router.get('/:id', getFamilyDetails)
    router.get('/:id/genuses', getFamilyGenuses)

    router.post('/', AuthenticatedOnly, AdminOnly, postFamily)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editFamily)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deleteFamily)

    return router
}

module.exports = FamilyRouter
