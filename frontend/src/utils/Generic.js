export const translateError = (error) => {
    if (error === 'phylum_already_exist') {
        return 'l\'embranchement existe déjà'
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