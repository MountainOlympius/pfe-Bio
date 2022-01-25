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

// Allow only authenticated request by using this middleware

const AuthenticatedOnly = (request, response, next) => {
    if (!request.authenticated || !request.account) {
        // Sending HTTP UNAUTHORIZED status
        return response.status(401).json({ ok: false, errors: ['authentication_required']})
    }

    next()
}

const AdminOnly = (request, response, next) => {
    if (request.account.is_admin) return next()

    response.status(401).json({ ok:false, errors: ['admin_only']})
}

module.exports = {
    Authentication,
    AuthenticatedOnly,
    AdminOnly
}