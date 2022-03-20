const { response } = require('express')
const SpeciesModels = require('../models/species')
const { isNull } = require('../utils/generic')
const { isNumber, checkAllowedFields, checkRequiredFields } = require('../utils/validators')

// TODO : Add delete images
// TODO : delete images

const getSpecies = (pool) => {
    const itemsPerPage = 10
    const { selectSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        let { page } = request.query

        page = isNumber(page) && Number(page) >= 1 ? page : 1

        const species = await selectSpecies(itemsPerPage, (page - 1 ) * itemsPerPage)

        return response.json({ ok : true, data: species})
    }
}

const searchSpecies = (pool) => {
    const { searchFromSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        let { query } = request.query

        const species = await searchFromSpecies(query)

        return response.json({ ok:false , data: species })
    }
}

// TODO : Add species images to response 
const getSpeciesWithDetails = (pool) => {
    const { selectSpeciesWithDetails } = SpeciesModels(pool)

    return async (request, response) => {
        let { id } = request.params

        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        const species = await selectSpeciesWithDetails(id)
        const responseBody = { ok: species ? true : false }
        if (species) responseBody.data = species

        return response.json(responseBody)
    }
}

const createSpecies = (pool) => {
    const { insertSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        let { body } = request
        
        const errors = []

        errors.push(...checkAllowedFields(body, ['name', 'description', 'genus_id']))
        errors.push(...checkRequiredFields(body, ['name', 'genus_id']))

        if (errors.length > 0) return response.json({ ok : false, errors })

        try { 
            const data = await insertSpecies(body)
            response.json({ ok: true , data })
        } catch (err) {
            const { constraint } = err
            const errors = []

            if (constraint === 'species_name_key') {
                errors.push('duplicated_species_name')
            } else if (constraint === 'species_genus_id_fkey') {
                errors.push('unexisting_genus')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok:false, errors })
        }
    }
}

const editSpecies = (pool) => {
    const { updateSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        const { body } = request
        const { id } = request.params
        const errors = []

        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        errors.push(...checkAllowedFields(body, ['name', 'description', 'genus_id']))

        if (errors.length > 0 || Object.keys(body).length <= 0) {
            return response.json({ ok : false, errors: errors.length > 0 ? errors: ['empty_body']})
        }

        try { 
            const updated = await updateSpecies(id, body)
            response.json({ ok: updated })
        } catch (err) {
            const { constraint } = err
            const errors = []

            if (constraint === 'species_name_key') {
                errors.push('duplicated_species_name')
            } else if (constraint === 'species_genus_id_fkey') {
                errors.push('unexisting_genus')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok:false, errors })
        }        
    }
}

const deleteSpecies = (pool) => {
    const { deleteFromSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        const deleted = await deleteFromSpecies(id)

        response.json({ ok: deleted })
    }
}

const addSpeciesCriteria = (pool) => {
    const { insertSpeciesCriteria } = SpeciesModels(pool)

    return async (request, response) => {
        const { body } = request
        const { id } = request.params
        const errors = []
        
        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        errors.push(...checkAllowedFields(body, ['content']))
        errors.push(...checkRequiredFields(body, ['content']))

        if ('content' in body && !Array.isArray(body.content)) errors.push('Content field must be an array')

        if (errors.length > 0) return response.json({ ok : false, errors: errors })

        try {
            const data = await insertSpeciesCriteria(id, body.content)
            response.json({ ok: true, data })
        } catch (err) {
            const { constraint } = err
            const errors = []

            if (constraint === 'species_criteria_species_id_fkey') {
                errors.push('unexisting_species')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok:false, errors })
        }
    } 
}

const deleteSpeciesCriteria = (pool) => {
    const { deleteFromCriteriaSpecies } = SpeciesModels(pool)

    return async (request, response) => {
        const { body } = request
        const { id } = request.params
        const errors = []

        if (isNull(id) || !isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        errors.push(...checkRequiredFields(body, ['ids']))

        if (errors.length > 0) return response.json({ ok : false, errors: errors })

        const deleted = await deleteFromCriteriaSpecies(id, body.ids)

        response.json({ ok: deleted })
    }
}

module.exports = (pool) => {
    return {
        getSpecies: getSpecies(pool),
        searchSpecies: searchSpecies(pool),
        getSpeciesWithDetails: getSpeciesWithDetails(pool),
        createSpecies: createSpecies(pool),
        editSpecies: editSpecies(pool),
        deleteSpecies: deleteSpecies(pool),
        addSpeciesCriteria: addSpeciesCriteria(pool),
        deleteSpeciesCriteria: deleteSpeciesCriteria(pool),
    }
}