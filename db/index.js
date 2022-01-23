const { Pool } = require('pg')

require('dotenv').config()

const config = {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || 'postges',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DATABASE || 'postgres'
}

const pool = new Pool(config)

module.exports = pool
