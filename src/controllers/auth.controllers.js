const { checkAllowedFields, checkRequiredFields } = require('../utils/validators')
const accountModel = require('../models/account')
const { checkHash } = require('../utils/crypt')

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

        response.json({ ok: true, data: account })
    }
}

const createLogoutController = (pool) => {
    return (request, response) => {
        response.json({ message: 'This is logout page' })
    }
}

const createIsLoggedInController = (pool) => {
    return (request, response) => {
        response.json({ message: 'This is isLoggedIn page' })
    }
}

module.exports = (pool) => {
    return {
        loginController: createLoginController(pool),
        logoutController: createLogoutController(pool),
        isLoggedInController: createIsLoggedInController(pool),
    }
}
