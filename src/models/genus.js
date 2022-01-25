const selectGenuses = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = `SELECT g.id, g.name, JSON_AGG(json_build_object ('id', gc.id, 'content', gc.content)) as criteria
        FROM genus As g
        LEFT JOIN genus_criteria AS gc ON gc.genus_id = g.id
        GROUP BY g.id, g.name
        ORDER BY g.created_date
        LIMIT $1 OFFSET $2;`

        const response = await pool.query(query, [limit, offset])

        return response.rows || []
    }
}

module.exports = (pool) => {
    return {
        selectGenuses: selectGenuses(pool)
    }
}