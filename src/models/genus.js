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

const selectGenusesWithDetails = (pool) => {
    return async (id, limit = 10) => {
        const query = `SELECT g.id, g.name, g.created_date, JSON_AGG(json_build_object ('id', gc.id, 'content', gc.content)) as criteria, JSON_AGG(json_build_object ('id', sp.id, 'name', sp.name, 'description', sp.description)) as species
        FROM genus As g
        LEFT JOIN LATERAL (
        SELECT * FROM species WHERE species.genus_id = $1 ORDER BY created_date LIMIT $2
        ) AS sp ON 1 = 1
        LEFT JOIN genus_criteria AS gc ON gc.genus_id = g.id
        WHERE g.id = $1
        GROUP BY g.id, g.name;`

        const response = await pool.query(query, [id, limit])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const selectSpeciesOfGenus = (pool) => {
    return async (id, last = 0, limit = 10) => {
        const query = 'select * from species WHERE genus_id = $1 AND id > $2 ORDER BY created_date LIMIT $3'
        const response = await pool.query(query, [id, last, limit])

        return response.rows || []
    }
}

const insertGenus = (pool) => {
    return async (id, name, description) => {
        const query = 'INSERT INTO genus (family_id, name, description) VALUES ($1, $2, $3) RETURNING id'
        const response = await pool.query(query, [id, name, description])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}


module.exports = (pool) => {
    return {
        selectGenuses: selectGenuses(pool),
        selectGenusesWithDetails: selectGenusesWithDetails(pool),
        selectSpeciesOfGenus: selectSpeciesOfGenus(pool),
        insertGenus: insertGenus(pool)
    }
}