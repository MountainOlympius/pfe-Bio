const express = require('express')

const AuthRouter = require('./auth.routes')

const ApiRouter = (pool) => {
    const router = express.Router()

    router.use('/auth', AuthRouter(pool))

    return router
}

module.exports = ApiRouter