const express = require('express')

const ApiRouter = require('./routes')

const App = () => {
    const app = express()

    app.use('/api', ApiRouter())

    return app
}

module.exports = App