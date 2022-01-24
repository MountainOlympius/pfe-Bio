const express = require('express')
const expressSession = require('express-session')
const PgConnectStore = require('connect-pg-simple')(expressSession)

require('dotenv').config()

const ApiRouter = require('./routes')
const { Authentication } = require('./middlewares/Authentication')

// TODO : Add CORS support in development envirement
const App = (pool) => {
    const app = express()

    app.use((request, response, next) => {
        console.log('[REQUEST]')
        next()
    })

    app.use(express.json())

    app.use(
        expressSession({
            store: new PgConnectStore({ pool }),
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 30 * 24 * 3600 },
            secret: process.env.session_secrect || '123456'
        })
    )

    app.use(Authentication(pool))
    app.use('/api', ApiRouter(pool))

    return app
}

module.exports = App
