const { checkAllowedFields, checkRequiredFields } = require('../utils/validators')
const accountModel = require('../models/account')
const { checkHash } = require('../utils/crypt')

// TODO : save user session
const createLoginController = (pool) => {
    const { selectByUsername } = accountModel(pool)

    return async (request, response) => {
        const { body } = request
        const errors = []

        errors.push(...checkRequiredFields(body, ['username', 'password']))
        errors.push(...checkAllowedFields(body, ['username', 'password']))

        if (errors.length > 0) return response.status(400).json({ ok: false, errors})

        const account = await selectByUsername(body.username)

        if (!account || !checkHash(body.password, account.password)) {
            return response.json({ ok: false, errors: ['Username or password is incorrect'] })
        }

        delete account.password
        
        request.session.account_id = account.id

        response.json({ ok: true, data: account })
    }
}

const createLogoutController = () => {
    return (request, response) => {
        if (request.session) {
            request.session.destroy()
        }

        response.json({ ok: true })
    }
}

const createIsLoggedInController = (pool) => {
    return (request, response) => {

        if (request.account) {
            const accountData = {...request.account}

            delete accountData.password

            return response.json({ isLoggedIn: true, accountData })
        }


        response.json({ isLoggedIn: false })
    }
}

module.exports = (pool) => {
    return {
        loginController: createLoginController(pool),
        logoutController: createLogoutController(),
        isLoggedInController: createIsLoggedInController(pool),
    }
}
