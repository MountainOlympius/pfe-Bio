const buildUpdateQuery = (table, allowedFields, data) => {
    const allowedEntries = Object.entries(data).filter(entry => allowedFields.includes(entry[0]))
    const updateFields = allowedEntries.map(entry => entry[0])
    const query = `UPDATE ${table} SET ${updateFields.map((field, id) => `${field} = $${id + 2}`).join(', ')} WHERE id = $1`

    return query
}

const getUpdateValues = (allowedFields, data) => {
    const allowedEntries = Object.entries(data).filter(entry => allowedFields.includes(entry[0]))
    const values = allowedEntries.map(entry => entry[1])

    return values
}

module.exports = {
    buildUpdateQuery,
    getUpdateValues
}