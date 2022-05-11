const { Pool } = require('pg')

require('dotenv').config()

const config = {
	host: process.env.PG_HOST || 'localhost',
	port: process.env.PG_PORT || 5432,
	user: process.env.PG_USER || 'postgres',
	password: process.env.PG_PASSWORD || 'postgres1234',
	database: process.env.PG_DATABASE || 'postgres',
	max: 4,
	min: 0,
	acquire: 30000,
	idle: 10000,
}

const pool = new Pool(config)

module.exports = pool
