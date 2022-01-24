const accountModel = require('../models/account')

// This is a middleware that check if the request 
// is comming an authenticated account

const Authentication = (pool) => {
    const { selectById } = accountModel(pool)
    
    return async (request, response, next) => {
        const { session } = request

        if (!session || !('account_id' in session)) return next()

        const account = await selectById(session.account_id)
        
        if (!account) return next ()
        
        request.authenticated = true
        request.account = account

        next()
    }
}

module.exports = {
    Authentication
}