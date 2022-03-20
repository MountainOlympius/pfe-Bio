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

const createSelectSpeciesWithDetails = (pool) => {
    return async (id) => {
        const query = `SELECT s.id, s.name, s.description, s.created_date,
            JSON_AGG(json_build_object('id', sc.id, 'content', sc.content)) AS criteria,
            json_build_object('id', g.id, 'name', g.name, 'family', json_build_object('id', f.id, 'name', f.name, 'phylum', 
            json_build_object('id', p.id, 'name', p.name))) AS genus
        FROM species AS s
        JOIN species_criteria AS sc ON s.id = sc.species_id
        JOIN genus AS g ON s.genus_id = g.id
        JOIN family AS f ON g.family_id = f.id
        JOIN phylum AS p ON f.phylum_id = p.id
        WHERE s.id = $1
        GROUP BY s.id, s.name, s.description, s.created_date, g.id, g.name, f.id, f.name, p.id, p.name
        ORDER BY created_date,id;`

        const response = await pool.query(query, [id])
        return response.rows && response.rows.length > 0 ? response.rows[0] : null
    }
}

module.exports = (pool) => {
    return {
        selectSpecies: createSelectSpecies(pool),
        searchFromSpecies: createSearchFromSpecies(pool),
        selectSpeciesWithDetails: createSelectSpeciesWithDetails(pool),
    }
}