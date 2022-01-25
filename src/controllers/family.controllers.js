const familyModels = require('../models/family')
const { isNumber, checkAllowedFields, checkRequiredFields } = require('../utils/validators')

const getFamilies = (pool) => {
    const { selectFamilies } = familyModels(pool)
    const itemsPerPage = 10

    return async (request, response) => {
        let { page = 1 } = request.query

        page = !isNumber(page) || page <= 0 ? 1 : page

        const families = await selectFamilies(itemsPerPage * page, (page - 1) * itemsPerPage)

        response.json({
            ok: true,
            data: families.map((family) => {
                return {
                    ...family,
                    criteria: (family.criteria || []).filter((cr) => cr.id),
                }
            }),
        })
    }
}

const getFamilyDetails = (pool) => {
    const { selectFamilyWithDetails } = familyModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) {
            return response.status(404).json({ ok: false })
        }

        let family = await selectFamilyWithDetails(id)

        // Clean data : remove [{id : null}]
        family.criteria = (family.criteria || []).filter(cr => cr.id)
        family.genuses = (family.genuses || []).filter(genus => genus.id)
        family.genuses = (family.genuses || []).map(genus => {
            return {
                ...genus,
                criteria: (genus.criteria || []).filter(cr => cr.id)
            }
        })

        response.json({ ok: true, data: family})
    }
}

const getFamilyGenuses = (pool) => {
    const { selectGenusesOfFamily } = familyModels(pool)

    return async (request, response) => {
        const { id } = request.params
        const { last = 0 } = request.query

        if (!isNumber(id) || Number(id) <= 0 || !isNumber(last)) {
            return response.status(404).json({ ok: false })
        }

        let genuses = await selectGenusesOfFamily(id, last)

        response.json({
            ok: true,
            data: genuses.map((genus) => {
                return {
                    ...genus,
                    criteria: (genus.criteria || []).filter((cr) => cr.id),
                }
            }),
        })
    }
}

const postFamily = (pool) => {
    const { insertFamily } = familyModels(pool)

    return async (request, response) => {
        const { body } = request
        const errors = []

        errors.push(...checkRequiredFields(body, ['name', 'phylum_id']))
        errors.push(...checkAllowedFields(body, ['name', 'phylum_id', 'description']))

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const { id } = await insertFamily(body.name, body.description, body.phylum_id)
            response.json({ ok: true, data: { id }})
        } catch (err) {
            const errors = []

            if (err.constraint === 'family_phylum_id_fkey') {
                errors.push('unexiting_phylum')
            } else if (err.constraint === 'family_name_key') {
                errors.push('duplicated_family_name')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok: false, errors })
        }

    }
}

const editFamily = (pool) => {
    const { updateFamily } = familyModels(pool)

    return async (request, response) => {
        const { body } = request
        const { id } = request.params
        const errors = []

        if (!isNumber(id) || Number(id) <= 0) {
            return response.status(404).json({ ok: false })
        }

        errors.push(...checkAllowedFields(body, ['name', 'phylum_id', 'description']))

        if (errors.length > 0) return response.json({ ok: false, errors })    
        
        try {
            const updated = await updateFamily(id, body)
            response.json({ ok: updated })
        } catch (err) {
            const errors = []

            if (err.constraint === 'family_phylum_id_fkey') {
                errors.push('unexiting_phylum')
            } else if (err.constraint === 'family_name_key') {
                errors.push('duplicated_family_name')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok: false, errors })
        }
    }
}

const deleteFamily = (pool) => {
    const { deleteFamily } = familyModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) return response.status(404).json({ ok: false })

        const deleted = await deleteFamily(id)

        response.json({ ok: deleted })
    }
}

const addFamilyCriteria = (pool) => {
    const { insertFamilyCriateria } = familyModels(pool)

    return async (request, response) => {
        const { id:fid } = request.params
        const { body } = request
        const errors = []

        if (!isNumber(fid) || Number(fid) <= 0) return response.status(404).json({ ok: false })

        errors.push(...checkRequiredFields(body, ['content']))
        errors.push(...checkAllowedFields(body, ['content']))

        if (errors.length > 0) return response.json({ ok: false, errors })    

        try {
            const { id } = await insertFamilyCriateria(fid, body.content)
            response.json({ ok: true, data: { id }})
        } catch (err) {
            if (err.constraint === 'family_criteria_family_id_fkey') {
                return response.status(404).json({ ok: false })
            } 

            response.json({ ok: false, errors: ['unknown_error'] })
        }
    }
}

const deleteFamilyCriteria = (pool) => {
    const { deleteFamilyCriteria } = familyModels(pool)

    return async (request, response) => {
        const { id:fid, criteriaId:cid } = request.params

        if (!isNumber(fid) || Number(fid) <= 0 || !isNumber(cid) || Number(cid) <= 0) {
            return response.status(404).json({ ok: false })
        }

        const deleted = await deleteFamilyCriteria(fid, cid)
        response.json({ ok: deleted })
    }
}

module.exports = (pool) => {
    return {
        getFamilies: getFamilies(pool),
        getFamilyDetails: getFamilyDetails(pool),
        getFamilyGenuses: getFamilyGenuses(pool),
        postFamily: postFamily(pool),
        editFamily: editFamily(pool),
        deleteFamily: deleteFamily(pool),
        addFamilyCriateria: addFamilyCriteria(pool),
        deleteFamilyCriateria: deleteFamilyCriteria(pool)
    }
}