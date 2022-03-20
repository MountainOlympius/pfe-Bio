const createSelectSpecies = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = `SELECT s.id, s.name, s.description, s.created_date,
            JSON_AGG(json_build_object('id', sc.id, 'content', sc.content)) AS criteria
        FROM species AS s
        JOIN species_criteria AS sc ON s.id = sc.species_id
        GROUP BY s.id, s.name, s.description, s.created_date
        ORDER BY created_date,id 
        LIMIT $1 OFFSET $2
        `

        const response = await pool.query(query, [limit, offset])
        return response.rows || []
    }
}

const createSearchFromSpecies = (pool) => {
    return async (q) => {
        const query = `SELECT s.id, s.name, s.description, s.created_date,
            JSON_AGG(json_build_object('id', sc.id, 'content', sc.content)) AS criteria
        FROM species AS s
        JOIN species_criteria AS sc ON s.id = sc.species_id
        WHERE lower(name) ~ $1
        GROUP BY s.id, s.name, s.description, s.created_date
        ORDER BY created_date,id`

        const response = await pool.query(query, [`.*${q.toLowerCase()}.*`])
        return response.rows || []
    }
}

module.exports = (pool) => {
    return {
        selectSpecies: createSelectSpecies(pool),
        searchFromSpecies: createSearchFromSpecies(pool),
    }
}