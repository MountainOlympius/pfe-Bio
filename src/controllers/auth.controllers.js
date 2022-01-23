const createLoginController = () => {
    return (request, response) => {
        response.json({ message: 'This is login page'})
    }
}

const createLogoutController = () => {
    return (request, response) => {
        response.json({ message: 'This is logout page'})
    }
}

const createIsLoggedInController = () => {
    return (request, response) => {
        response.json({ message: 'This is isLoggedIn page'})
    }
}

module.exports = () => {
    return {
        loginController: createLoginController(),
        logoutController: createLogoutController(),
        isLoggedInController: createIsLoggedInController()
    }
}