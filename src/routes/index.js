const express = require('express')

const AuthRouter = require('./auth.routes')

const ApiRouter = () => {
    const router = express.Router()

    router.use('/auth', AuthRouter())

    return router
}

module.exports = ApiRouter