const express = require('express')

const AuthRouter = require('./auth.routes')
const FamilyRouter = require('./family.routes')
const GenusRouter = require('./genus.routes')
const PhylumRouter = require('./phylum.routes')
const SpeciesRouter = require('./species.routes')

const ApiRouter = (pool) => {
    const router = express.Router()

    router.use('/auth', AuthRouter(pool))
    router.use('/phylum', PhylumRouter(pool))
    router.use('/family', FamilyRouter(pool))
    router.use('/genus', GenusRouter(pool))
    router.use('/species', SpeciesRouter(pool))

    return router
}

module.exports = ApiRouter