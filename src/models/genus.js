const { buildUpdateQuery, getUpdateValues } = require("../utils/sql")

const selectGenuses = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = `SELECT g.id, g.name, g.description, JSON_AGG(json_build_object ('id', gc.id, 'content', gc.content)) as criteria
        FROM genus As g
        LEFT JOIN genus_criteria AS gc ON gc.genus_id = g.id
        GROUP BY g.id, g.name
        ORDER BY g.created_date, g.id
        LIMIT $1 OFFSET $2;`

        const response = await pool.query(query, [limit, offset])

        return response.rows || []
    }
}

const selectGenusesWithDetails = (pool) => {
    return async (id, limit = 10) => {
        const query = `SELECT g.id, g.name, g.created_date, g.description, 
            JSON_AGG(json_build_object ('id', gc.id, 'content', gc.content)) as criteria, JSON_AGG(json_build_object ('id', sp.id, 'name', sp.name, 'description', sp.description)) as species,
            JSON_BUILD_OBJECT('id', f.id, 'name', f.name, 'phylum', json_build_object('id', p.id, 'name', p.name)) as family
        FROM genus As g
        LEFT JOIN LATERAL (
        SELECT * FROM species WHERE species.genus_id = $1 ORDER BY created_date LIMIT $2
        ) AS sp ON 1 = 1
        JOIN family as f ON f.id = g.family_id
        JOIN phylum as p ON p.id = f.phylum_id
        LEFT JOIN genus_criteria AS gc ON gc.genus_id = g.id
        WHERE g.id = $1
        GROUP BY g.id, g.name, g.created_date, g.description, f.id, f.name, p.id, p.name;`

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

const insertSpecies = (pool) => {
    return async (id, name, description) => {
        const query = 'INSERT INTO species (genus_id, name, description) VALUES ($1, $2, $3) RETURNING id'
        const response = await pool.query(query, [id, name, description])
        
        if (response.rows?.length <= 0) return null
        
        return response.rows[0]
    }
}

const insertGenusCriteria = (pool) => {
    return async (id, content) => {
        const query = 'INSERT INTO genus_criteria (genus_id, content) VALUES ($1, $2) RETURNING id'
        const response = await pool.query(query, [id, content])
        
        if (response.rows?.length <= 0) return null
        
        return response.rows[0]
    }
}

const updateGenus = (pool) => {
    const allowedFields = ['name', 'description']

    return async (id, data)  => {
        const query = buildUpdateQuery('genus', allowedFields, data)
        const values = getUpdateValues(allowedFields, data)

        if (values.length <= 0) return false

        const response = await pool.query(query, [id, ...values])

        return response.rowCount > 0
    } 
}

const deleteGenus = (pool) => {
    return async (id) => {
        const response = await pool.query('DELETE FROM genus WHERE id = $1', [id])
        return response.rowCount > 0
    }
}

const deleteSpecies = (pool) => {
    return async (id, sid) => {
        const response = await pool.query('DELETE FROM species WHERE id = $2 AND genus_id = $1', [id, sid])
        return response.rowCount > 0
    }
}

const deleteGenusCriteria = (pool) => {
    return async (id, cid) => {
        const response = await pool.query('DELETE FROM genus_criteria WHERE id = $2 AND genus_id = $1', [id, cid])
        return response.rowCount > 0
    }
}

module.exports = (pool) => {
    return {
        selectGenuses: selectGenuses(pool),
        selectGenusesWithDetails: selectGenusesWithDetails(pool),
        selectSpeciesOfGenus: selectSpeciesOfGenus(pool),
        insertGenus: insertGenus(pool),
        insertSpecies: insertSpecies(pool),
        insertGenusCriteria: insertGenusCriteria(pool),
        updateGenus: updateGenus(pool),
        deleteGenus: deleteGenus(pool),
        deleteSpecies: deleteSpecies(pool),
        deleteGenusCriteria: deleteGenusCriteria(pool)
    }
}