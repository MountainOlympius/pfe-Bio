const getFamilies = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const getFamilyDetails = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const getFamilyGenuses = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const postFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const editFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

const deleteFamily = (pool) => {
    return async (request, response) => {
        response.json({ ok: false, message: 'This endpoint hasn\'t been implemented yet.'})
    }
}

module.exports = (pool) => {
    return {
        getFamilies: getFamilies(pool),
        getFamilyDetails: getFamilyDetails(pool),
        getFamilyGenuses: getFamilyGenuses(pool),
        postFamily: postFamily(pool),
        editFamily: editFamily(pool),
        deleteFamily: deleteFamily(pool)
    }
}