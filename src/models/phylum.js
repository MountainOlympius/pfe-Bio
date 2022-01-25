const { buildUpdateQuery, getUpdateValues } = require("../utils/sql")

const createGetPhylums = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = 'SELECT * FROM phylum ORDER BY created_date LIMIT $1 OFFSET $2'
        const response = await pool.query(query, [limit, offset])

        return response.rows || []
    }
}

const createSelectPhylumWithDetails = (pool) => {
    return async (id, limit = 10) => {
        const query = `SELECT p.id, p.name, p.description, json_agg(json_build_object('id', f.id, 'name', f.name)) As families
        From phylum as p
        LEFT JOIN LATERAL (
         SELECT * FROM family WHERE phylum_id = $1 ORDER BY created_date LIMIT $2
        ) AS f ON 1 = 1
        where p.id = $1
        GROUP BY p.id, p.name, p.description`
        const response = await pool.query(query, [id, limit])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const createSelectFamiliesOfPhylum = (pool) => {
    return async (id, lastId = 0) => {
        const query = 'SELECT id, name FROM family WHERE phylum_id = $1 AND id > $2 ORDER BY created_date'
        const response = await pool.query(query, [id, lastId])

        return response.rows || []
    }
}

const createInserter = (pool) => {
    return async (name, description) => {
        const query = 'INSERT INTO phylum (name, description) VALUES ($1, $2) RETURNING id'
        const response = await pool.query(query, [name, description])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const createDeleter = (pool) => {
    return async (id) => {
        const query = 'DELETE FROM phylum WHERE id = $1'
        const response = await pool.query(query, [id])

        return response.rowCount > 0
    }
}

const createUpdater = (pool) => {
    const allowedFields = ['name', 'description']

    return async (id, data) => {
        const values = getUpdateValues(allowedFields, data)
        const query = buildUpdateQuery('phylum', allowedFields, data)

        const response = await pool.query(query, [id, ...values])

        return response.rowCount > 0
    }
}

module.exports = (pool) => {
    return {
        selectPhylums : createGetPhylums(pool),
        selectPhylumWithDetails: createSelectPhylumWithDetails(pool),
        selectFamiliesOfPhylum: createSelectFamiliesOfPhylum(pool),
        insertPhylum: createInserter(pool),
        deletePhylum: createDeleter(pool),
        updatePhylum: createUpdater(pool)
    }
}