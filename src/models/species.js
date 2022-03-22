const { buildUpdateQuery, getUpdateValues } = require("../utils/sql")

const createSelectSpecies = (pool) => {
    return async (limit = 10, offset = 0) => {
        const query = `SELECT s.id, s.name, s.description, s.created_date,
            JSON_AGG(json_build_object('id', sc.id, 'content', sc.content)) AS criteria
        FROM species AS s
        LEFT JOIN species_criteria AS sc ON s.id = sc.species_id
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
        LEFT JOIN species_criteria AS sc ON s.id = sc.species_id
        WHERE lower(name) ~ $1
        GROUP BY s.id, s.name, s.description, s.created_date
        ORDER BY created_date,id`

        const response = await pool.query(query, [`${q.toLowerCase()}.*$`])
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
        LEFT JOIN species_criteria AS sc ON s.id = sc.species_id
        LEFT JOIN genus AS g ON s.genus_id = g.id
        LEFT JOIN family AS f ON g.family_id = f.id
        LEFT JOIN phylum AS p ON f.phylum_id = p.id
        WHERE s.id = $1
        GROUP BY s.id, s.name, s.description, s.created_date, g.id, g.name, f.id, f.name, p.id, p.name
        ORDER BY created_date,id;`

        const response = await pool.query(query, [id])
        return response.rows && response.rows.length > 0 ? response.rows[0] : null
    }
}

const createSpeciesInserter = (pool) => {
    return async ({ name, description, genus_id }) => {
        const query = `INSERT INTO species (name, description, genus_id) VALUES ($1, $2, $3) RETURNING id`

        const response = await pool.query(query, [name, description, genus_id])

        return response.rows && response.rows.length > 0 ? response.rows[0] : null
    }
}

const createSpeciesUpdater = (pool) => {
    const allowedFields = ['name', 'description', 'genus_id']

    return async (id , data) => {
        const query = buildUpdateQuery('species', allowedFields, data)
        const values = getUpdateValues(allowedFields, data)

        const response = await pool.query(query, [id, ...values])

        return response.rowCount > 0
    }
}

const createSpeciesDelete = (pool) => {
    return async (id) => {
        const query = `DELETE FROM species WHERE id = $1`
        const response = await pool.query(query, [id])

        return response.rowCount > 0
    }
}

const createSpeciesCriteriaInserter = (pool) => {
    return async (id, contents) => {
        if (contents.length <= 0) return false

        const query = `INSERT INTO species_criteria (species_id, content) VALUES 
        ${contents.map((content, i) => `($1, $${i + 2})`)} RETURNING id,content`;

        const response = await pool.query(query, [id, ...contents])

        return response.rows || []
    }
}

const createSpeciesImagesInserter = (pool) => {
    return async (id, images) => {
        if (images.length <= 0) return false

        const query = `INSERT INTO species_image (species_id, url, local_path) VALUES 
        ${images.map((img, i) => `($1, $${(i + 1) * 2}, $${(i * 2) + 3})`).join(',')} RETURNING id,url`;
        const values = images.map(img => Object.values(img)).reduce((p, img) => [...p, ...img], [])

        const response = await pool.query(query, [id, ...values])

        return response.rows || []
    }
}

const createSpeciesCriteraiDelete = (pool) => {
    return async (id, ids) => {
        if (ids.length <= 0) return false

        const query = `DELETE FROM species_criteria WHERE id in (${ids.map((c, i) => `$${i + 2}`).join(',')})AND species_id = $1`
        const response = await pool.query(query, [id, ...ids])

        return response.rowCount > 0
    }
}

const createSpeciesImagesDelete = (pool) => {
    return async (id, ids) => {
        if (ids.length <= 0) return false

        const query = `DELETE FROM species_image WHERE id in (${ids.map((c, i) => `$${i + 2}`).join(',')})AND species_id = $1 RETURNING local_path`
        const response = await pool.query(query, [id, ...ids])

        return response.rows || []
    }
}

module.exports = (pool) => {
    return {
        selectSpecies: createSelectSpecies(pool),
        searchFromSpecies: createSearchFromSpecies(pool),
        selectSpeciesWithDetails: createSelectSpeciesWithDetails(pool),
        insertSpecies: createSpeciesInserter(pool),
        updateSpecies: createSpeciesUpdater(pool),
        deleteFromSpecies: createSpeciesDelete(pool),
        insertSpeciesCriteria: createSpeciesCriteriaInserter(pool),
        deleteFromCriteriaSpecies: createSpeciesCriteraiDelete(pool),
        insertSpeciesImages: createSpeciesImagesInserter(pool),
        deleteSpeciesImages: createSpeciesImagesDelete(pool) 
    }
}