const express = require('express')
const expressSession = require('express-session')
const PgConnectStore = require('connect-pg-simple')(expressSession)
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { default: helmet } = require('helmet')
const compression = require('compression')

require('dotenv').config()

const ApiRouter = require('./routes')
const { Authentication } = require('./middlewares/Authentication')

// TODO : Check security files

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
    
    app.use(helmet())
    app.use(compression())
    app.use(Authentication(pool))
    app.use('/api', ApiRouter(pool))
    app.use('/static', express.static(path.resolve(__dirname, '../frontend/build/static')))
    app.get('*', (request, response) => {
        const date = new Date()
        const pathToFile = path.join(__dirname, '../frontend/build', request.path)

        if (fs.existsSync(pathToFile) && fs.statSync(pathToFile).isFile()) {
            return response.sendFile(pathToFile)
        }
        
        response.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })

    return app
}

module.exports = App
