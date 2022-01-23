const createLoginController = (pool) => {
    return (request, response) => {
        response.json({ message: 'This is login page'})
    }
}

const createLogoutController = (pool) => {
    return (request, response) => {
        response.json({ message: 'This is logout page'})
    }
}

const createIsLoggedInController = (pool) => {
    return (request, response) => {
        response.json({ message: 'This is isLoggedIn page'})
    }
}

module.exports = (pool) => {
    return {
        loginController: createLoginController(pool),
        logoutController: createLogoutController(pool),
        isLoggedInController: createIsLoggedInController(pool)
    }
}