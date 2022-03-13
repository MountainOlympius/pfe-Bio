const express = require('express')

const familyControllers = require('../controllers/family.controllers')
const { AuthenticatedOnly, AdminOnly } = require('../middlewares/Authentication')

const FamilyRouter = (pool) => {
    const router = express.Router()
    const { getFamilies, getFamilyDetails, getFamilyGenuses, postFamily, editFamily, deleteFamily, addFamilyCriateria, deleteFamilyCriateria, searchFamily } = familyControllers(pool)

    router.get('/', getFamilies)
    router.get('/search', searchFamily)
    router.get('/:id', getFamilyDetails)
    router.get('/:id/genuses', getFamilyGenuses)

    router.post('/', AuthenticatedOnly, AdminOnly, postFamily)
    router.put('/:id', AuthenticatedOnly, AdminOnly, editFamily)
    router.delete('/:id', AuthenticatedOnly, AdminOnly, deleteFamily)

    router.post('/:id/criteria', AuthenticatedOnly, AdminOnly, addFamilyCriateria)
    router.delete('/:id/criteria/:criteriaId', AuthenticatedOnly, AdminOnly, deleteFamilyCriateria)

    return router
}

module.exports = FamilyRouter
