const express = require('express')
const expressSession = require('express-session')
const PgConnectStore = require('connect-pg-simple')(expressSession)
const cors = require('cors')

require('dotenv').config()

const ApiRouter = require('./routes')
const { Authentication } = require('./middlewares/Authentication')

const App = (pool) => {
    const app = express()

    app.use(express.json())

    app.use(cors({
        credentials: true,
        origin: process.env.CORS_ALLOW_ORIGIN?.split(',') || '*'
    }))

    app.use(
        expressSession({
            store: new PgConnectStore({ pool }),
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
            secret: process.env.session_secrect || '123456',
        })
    )

    app.use(Authentication(pool))
    app.use('/api', ApiRouter(pool))

    return app
}

module.exports = App
