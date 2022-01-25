const createSelectFamilies = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = `SELECT f.id, f.name, f.created_date, json_agg(json_build_object('id', fc.id, 'content', fc.content)) as criteria 
        FROM family AS f
        LEFT JOIN family_criteria AS fc ON fc.family_id = f.id
        GROUP BY f.id, f.name, f.created_date
        ORDER BY f.created_date
        LIMIT $1 OFFSET $2`
        const response = await pool.query(query, [limit, offset])

        return response.rows || []
    }
}

module.exports = (pool) => {
    return {
        selectFamilies: createSelectFamilies(pool)
    }
}