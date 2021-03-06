const { buildUpdateQuery, getUpdateValues } = require("../utils/sql")

const createSearchFamily = (pool) => {
    return async (q) => {
        const query = `SELECT f.id, f.name, f.created_date, json_agg(json_build_object('id', fc.id, 'content', fc.content)) as criteria 
        FROM family AS f
        LEFT JOIN family_criteria AS fc ON fc.family_id = f.id
        WHERE lower(name) ~  $1
        GROUP BY f.id, f.name, f.created_date
        ORDER BY f.created_date`

        const response = await pool.query(query, [`^${q.toLowerCase()}.*`])

        return response.rows || []
    }
}

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
    return async (id) => {
        const query = `SELECT f.id, f.name, f.created_date, f.description, 
            JSON_AGG(json_build_object('id', fc.id, 'content', fc.content)) as criteria , 
            json_build_object('id', p.id, 'name', p.name) as phylum
        FROM family AS f
        LEFT JOIN family_criteria AS fc ON fc.family_id = f.id
        LEFT JOIN phylum AS p ON f.phylum_id = p.id
        WHERE f.id = $1
        GROUP BY f.id, f.name, f.created_date, p.id, p.name, f.description;`

        const response = await pool.query(query, [id])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const createSelectGenusesOfFamily = (pool) => {
    return async (id, last = 0) => {
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

const createFamilyUpdater = (pool) => {
    const allowedFields = ['name', 'description', 'phylum_id']

    return async (id, data) => {
        const query = buildUpdateQuery('family', allowedFields, data)
        const values = getUpdateValues(allowedFields, data)

        if (values.length <= 0) return false

        const response = await pool.query(query, [id, ...values])

        return response.rowCount > 0
    }
}

const createFamilyDeleter = (pool) => {
    return async (id) => {
        const response = await pool.query('DELETE FROM family WHERE id = $1', [id])
        return response.rowCount > 0
    }
}

const createFamilyCriateriaInserter = (pool) => {
    return async (id, content) => {
        const query = `INSERT INTO family_criteria (family_id, content) VALUES ($1, $2) RETURNING id`
        const response = await pool.query(query, [id, content])

        if (response.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const createFamilyCriteriaDeleted = (pool) => {
    return async (fid, cid) => {
        const response = await pool.query('DELETE FROM family_criteria WHERE family_id = $1 AND id = $2', [fid, cid])
        return response.rowCount > 0
    }
}

module.exports = (pool) => {
    return {
        selectFamilies: createSelectFamilies(pool),
        selectFamilyWithDetails: createSelectFamilyWithDetails(pool),
        insertFamily: createFamilyInserter(pool),
        insertFamilyCriateria: createFamilyCriateriaInserter(pool),
        selectGenusesOfFamily: createSelectGenusesOfFamily(pool),
        updateFamily: createFamilyUpdater(pool),
        deleteFamily: createFamilyDeleter(pool),
        deleteFamilyCriteria: createFamilyCriteriaDeleted(pool),
        searchFamily: createSearchFamily(pool)
    }
}
