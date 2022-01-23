const express = require('express')

const authControllers = require('../controllers/auth.controllers')

const AuthRouter = () => {
    const router = express.Router()

    const { loginController, logoutController, isLoggedInController } = authControllers()

    router.get('/logout', logoutController)
    router.post('/login', loginController)
    router.get('/', isLoggedInController)

    return router
}

module.exports = AuthRouter