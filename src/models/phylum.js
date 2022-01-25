const createGetPhylums = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = 'SELECT * FROM phylum ORDER BY created_date DESC LIMIT $1 OFFSET $2'
        const response = await pool.query(query, [limit, offset])

        return response.rows
    }
}

module.exports = (pool) => {
    return {
        getPhylums : createGetPhylums(pool)
    }
}