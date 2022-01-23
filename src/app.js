const express = require('express')

const ApiRouter = require('./routes')

const App = (pool) => {
    const app = express()

    app.use('/api', ApiRouter(pool))

    return app
}

module.exports = App