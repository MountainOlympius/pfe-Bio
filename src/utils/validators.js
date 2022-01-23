const { isNull } = require('./generic')

const checkRequiredFields = (form, requiredFields) => {
    const errors = []

    requiredFields.forEach(field => {
        if (!(field in form) || isNull(form[field])) errors.push(`The ${field} field is required`)
    })

    return errors
}

const checkAllowedFields = (form, allowedFields) => {
    const errors = []

    Object.entries(form).forEach(entry => {
        if (!allowedFields.includes(entry[0])) errors.push(`The ${entry[0]} field is not allowed`)
    })

    return errors
}

module.exports = {
    checkRequiredFields,
    checkAllowedFields
}