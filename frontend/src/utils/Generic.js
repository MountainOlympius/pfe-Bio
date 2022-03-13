export const translateError = (error) => {
    if (error === 'phylum_already_exist') {
        return 'l\'embranchement existe déjà'
    }

    return error
}

export const translateErrors = (errors) => {
    return errors.map(translateError)
}