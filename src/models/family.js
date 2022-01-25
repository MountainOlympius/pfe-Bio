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

const createSelectFamilyWithDetails = (pool) => {
    return async (id, limit = 10) => {
        const query = `SELECT f.id, f.name, f.created_date, f.description, 
            JSON_AGG(json_build_object('id', fc.id, 'content', fc.content)) as criteria , 
            JSON_AGG(json_build_object('id', genuses.id, 'name', genuses.name, 'criteria', genuses.criteria)) as genuses
        FROM family AS f
        LEFT JOIN LATERAL (
            select g.id, g.name, JSON_AGG(json_build_object('id', gc.id, 'content', gc.content)) as criteria
            FROM genus as g
            LEFT JOIN genus_criteria as gc on g.id = gc.genus_id
            where family_id = $1
            group by g.name, g.id
            ORDER BY g.created_date
            LIMIT $2
        ) AS genuses ON  1 = 1
        LEFT JOIN family_criteria AS fc ON fc.family_id = f.id
        WHERE f.id = $1
        GROUP BY f.id, f.name, f.created_date;`

        const response = await pool.query(query, [id, limit])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const createSelectGenusesOfFamily = (pool) => {
    return async (id, last) => {
        const query = `select g.id, g.name, JSON_AGG(json_build_object('id', gc.id, 'content', gc.content)) as criteria
            FROM genus as g
            LEFT JOIN genus_criteria as gc on g.id = gc.genus_id
            where family_id = $1 AND g.id > $2
            group by g.name, g.id
            ORDER BY g.created_date
            LIMIT 10`

        const response = await pool.query (query, [id, last])

        return response.rows || []
    }
}

const createFamilyInserter = (pool) => {
    return async (name, description, phylumId) => {
        const query = 'INSERT INTO family (name, description, phylum_id) VALUES ($1, $2, $3) RETURNING id'
        const response = await pool.query(query, [name, description, phylumId])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

module.exports = (pool) => {
    return {
        selectFamilies: createSelectFamilies(pool),
        selectFamilyWithDetails: createSelectFamilyWithDetails(pool),
        insertFamily: createFamilyInserter(pool),
        selectGenusesOfFamily: createSelectGenusesOfFamily(pool)
    }
}