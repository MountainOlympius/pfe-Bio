const express = require('express')

const AuthRouter = require('./auth.routes')
const PhylumRouter = require('./phylum.routes')

const ApiRouter = (pool) => {
    const router = express.Router()

    router.use('/auth', AuthRouter(pool))
    router.use('/phylum', PhylumRouter(pool))

    return router
}

module.exports = ApiRouter