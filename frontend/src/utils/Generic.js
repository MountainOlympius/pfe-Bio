export const translateError = (error) => {
    if (error === 'phylum_already_exist') {
        return 'l\'embranchement existe déjà'
    } else if (error === 'duplicated_name') {
        return 'Le nom est dupliqué'
    } else if (error === 'unexiting_phylum') {
        return 'l\'embranchement n\'existe pas'
    } else if (error === 'duplicated_family_name') {
        return 'Le nom de famille est dupliqué'
    } else if (error === 'unexisting_family') {
        return 'la famille n\'existe pas'
    } else if (error === 'duplicated_genus_name') {
        return 'Le nom du genre est dupliqué'
    } else if (error === 'duplicated_species_name') {
        return 'Le nom d\'espèce est dupliqué'
    }

    return error
}

export const translateErrors = (errors) => {
    return errors.map(translateError)
}

export const formatDate = (date) => {
    const hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()

    return date.toLocaleDateString() + `, ${hours}:${minutes}`
}

export const getObjectDiff = (obj1, obj2) => {
    const result = {}

    Object.entries(obj1).forEach(entity => {
        if (obj2[entity[0]] != entity[1]) {
            result[entity[0]] = obj2[entity[0]] 
        }
    })

    return result
}

export const getCriteriaDiff = (arr1, arr2) => {
    const deleted = []
    const added = []

    arr1.forEach(elt => {
        const found = arr2.find(e => e.id == elt.id)

        if (!found) {
            deleted.push(elt)
        } else if (found.content != elt.content) {
            deleted.push(elt)
            added.push(found)
        }
    })

    arr2.forEach(elt => {
        const found = arr1.find(e => e.id == elt.id)

        if (!found) {
            added.push(elt)
        }
    })

    return [deleted, added]
}

export const cloneObject = (obj) => JSON.parse(JSON.stringify(obj))