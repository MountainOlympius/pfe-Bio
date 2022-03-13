export const translateError = (error) => {
    if (error === 'phylum_already_exist') {
        return 'l\'embranchement existe déjà'
    } else if (error === 'duplicated_name') {
        return 'Le nom est dupliqué'
    } else if (error === 'unexiting_phylum') {
        return 'l\'embranchement n\'existe pas'
    } else if (error === 'duplicated_family_name') {
        return 'Le nom de famille est dupliqué'
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