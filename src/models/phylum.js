const createGetPhylums = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = 'SELECT * FROM phylum ORDER BY created_date DESC LIMIT $1 OFFSET $2'
        const response = await pool.query(query, [limit, offset])

        return response.rows || []
    }
}

const createSelectPhylumWithDetails = (pool) => {
    return async (id, limit = 10, offset = 0) => {
        const query = `SELECT p.id, p.name, p.description, json_agg(json_build_object('id', f.id, 'name', f.name)) As families
        From phylum as p
        LEFT JOIN LATERAL (
         SELECT * FROM family WHERE phylum_id = $1 LIMIT $2 OFFSET $3
        ) AS f ON 1 = 1
        where p.id = $1
        GROUP BY p.id, p.name, p.description`
        const response = await pool.query(query, [id, limit, offset])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

module.exports = (pool) => {
    return {
        selectPhylums : createGetPhylums(pool),
        selectPhylumWithDetails: createSelectPhylumWithDetails(pool)
    }
}