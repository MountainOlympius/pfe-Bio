const genusModels = require('../models/genus')

const { isNumber, checkAllowedFields, checkRequiredFields } = require('../utils/validators')

const getGenuses = (pool) => {
    const { selectGenuses } = genusModels(pool)
    const itemsPerPage = 10

    return async (request, response) => {
        let { page = 1 } = request.query

        page = !isNumber(page) || page <= 0 ? 1 : page

        const genuses = await selectGenuses(itemsPerPage, (page - 1) * itemsPerPage)

        response.json({
            ok: true,
            data: genuses.map((genus) => {
                return {
                    ...genus,
                    criteria: genus.criteria.filter((cr) => cr.id),
                }
            }),
        })
    }
}

const searchForGenuses = (pool) => {
    const { searchGenuses } = genusModels(pool)

    return async (request, response) => {
        let { query } = request.query

        const genuses = await searchGenuses(query)

        response.json({
            ok: true,
            data: genuses.map((genus) => {
                return {
                    ...genus,
                    criteria: genus.criteria.filter((cr) => cr.id),
                }
            }),
        })
    }
}

const getGenusWithDetails = (pool) => {
    const { selectGenusesWithDetails } = genusModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        const genus = await selectGenusesWithDetails(id)

        if (!genus) return response.status(404).json({ ok: false }) 

        genus.criteria = genus.criteria.filter((cr) => cr.id)
        genus.species = genus.species.filter((sp) => sp.id)

        response.json({ ok: true, data: genus })
    }
}

const getSpeciesOfGenus = (pool) => {
    const { selectSpeciesOfGenus } = genusModels(pool)

    return async (request, response) => {
        const { id } = request.params
        const { last = 0} = request.query

        if (!isNumber(id) || Number(id) <= 0 || !isNumber(last)) return response.json({ ok: false })

        const species = await selectSpeciesOfGenus(id, last)

        response.json({ ok: true, data: species })
    }
}

const postGenus = (pool) => {
    const { insertGenus } = genusModels(pool)
    
    return async (request, response) => {
        const { body } = request
        const errors = []

        errors.push(...checkAllowedFields(body, ['name', 'description', 'family_id']))
        errors.push(...checkRequiredFields(body, ['name', 'family_id']))

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const { id } = await insertGenus(body.family_id, body.name, body.description)
            response.json({ ok:true, data: { id }})
        } catch (err) {
            const errors = []

            if (err.constraint === 'genus_family_id_fkey') {
                errors.push('unexisting_family')
            } else if (err.constraint === 'genus_name_key') {
                errors.push('duplicated_genus_name')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok: false, errors })
        }

    }
}

// const postSpecies = (pool) => {
//     const { insertSpecies } = genusModels(pool)

//     return async (request, response) => {
//         const { id } = request.params
//         const { body } = request
//         const errors = []

//         if (!isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

//         errors.push(...checkAllowedFields(body, ['name', 'description']))
//         errors.push(...checkRequiredFields(body, ['name']))

//         if (errors.length > 0) return response.json({ ok: false, errors })

//         try {
//             const { id:sid } = await insertSpecies(id, body.name, body.description)
//             response.json({ ok:true, data: { id:sid }})
//         } catch (err) {
//             const errors = []

//             if (err.constraint === 'species_genus_id_fkey') {
//                 errors.push('unexisting_genus')
//             } else if (err.constraint === 'species_name_key') {
//                 errors.push('duplicated_species_name')
//             } else {
//                 errors.push('unknown_error')
//             }

//             response.json({ ok: false, errors })
//         }
//     }
// }

const postGenusCriteria = (pool) => {
    const { insertGenusCriteria } = genusModels(pool)

    return async (request, response) => {
        const { id } = request.params
        const { body } = request
        const errors = []

        if (!isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        errors.push(...checkAllowedFields(body, ['content']))
        errors.push(...checkRequiredFields(body, ['content']))

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const { id:cid } = await insertGenusCriteria(id, body.content)
            response.json({ ok:true, data: { id:cid }})
        } catch (err) {
            const errors = []

            if (err.constraint === 'genus_criteria_genus_id_fkey') {
                errors.push('unexisting_genus')
            } else {
                errors.push('unknown_error')
            }

            console.log(err)
            response.json({ ok: false, errors })
        }
    }
}

const editGenus = (pool) => {
    const { updateGenus } = genusModels(pool)

    return async (request, response) => {
        const { id } = request.params
        const { body } = request
        const errors = []

        if (!isNumber(id) || Number(id) <= 0) return response.json({ ok: false })

        errors.push(...checkAllowedFields(body, ['name', 'description', 'family_id']))

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const updated = await updateGenus(id, body)
            response.json({ ok: updated })
        } catch (err) {
            const errors = []

            if (err.constraint === 'genus_name_key') {
                errors.push('duplicated_genus_name')
            } else {
                errors.push('unknown_error')
            }

            response.json({ ok: false, errors })
        }
    }
}

const deleteGenus = (pool) => {
    const { deleteGenus } = genusModels(pool)

    return async (request, response) => {
        const { id } = request.params

        if (!isNumber(id) || Number(id) <= 0) {
            return response.json({ ok: false })
        }

        const deleted = await deleteGenus(id)

        response.json({ ok: deleted })
    }
}

const deleteGenusCriteria = (pool) => {
    const { deleteGenusCriteria } = genusModels(pool)

    return async (request, response) => {
        const { id, criteriaId:cid } = request.params

        if (!isNumber(id) || Number(id) <= 0 || !isNumber(cid) || Number(cid) <= 0) {
            return response.json({ ok: false })
        }

        const deleted = await deleteGenusCriteria(id, cid)
        
        response.json({ ok: deleted })
    }
}

// const deleteSpecies = (pool) => {
//     const { deleteSpecies } = genusModels(pool)

//     return async (request, response) => {
//         const { id, speciesId:sid } = request.params

//         if (!isNumber(id) || Number(id) <= 0 || !isNumber(sid) || Number(sid) <= 0) {
//             return response.json({ ok: false })
//         }

//         const deleted = await deleteSpecies(id, sid)

//         response.json({ ok: deleted })
//     }
// }

module.exports = (pool) => {
    return {
        getGenuses: getGenuses(pool),
        getGenusWithDetails: getGenusWithDetails(pool),
        getSpeciesOfGenus: getSpeciesOfGenus(pool),
        postGenus: postGenus(pool),
        postGenusCriteria: postGenusCriteria(pool),
        // postSpecies: postSpecies(pool),
        editGenus: editGenus(pool),
        deleteGenus: deleteGenus(pool),
        deleteGenusCriteria: deleteGenusCriteria(pool),
        // deleteSpecies: deleteSpecies(pool),
        searchForGenuses: searchForGenuses(pool)
    }
}