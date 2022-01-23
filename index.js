const App = require('./src/app')

const pool = require('./db')


// Check if the database has been connected successfully
const testDbConnection = async (pool) => {
    try {
        const client = await pool.connect()
        client.release()
        return true
    } catch (err) {
        console.error('[DB-ERROR] Couldn\'t connect to the database')
        console.error(`[DB-ERROR] ${err}`)
        return false
    }
}

// Don't start express application until the connection to the database has been established
const startApplication = async (port = 8000) => {
    const connected = await testDbConnection(pool)

    if (!connected) return

    App(pool).listen(port, () => {
        console.log(`[*] Application is listening on port ${port}`)
    })
}

startApplication()