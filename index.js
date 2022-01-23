const App = require('./src/app')

const startApplication = (port = 8000) => {
    App().listen(port, () => {
        console.log(`[*] Application is listening on port ${port}`)
    })
}

startApplication()