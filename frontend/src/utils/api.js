import { getRequest } from './http'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || window.location.origin

export const getAuthenticatedAccount = async () => {
    const reqUrl = new URL(apiBaseUrl)
    reqUrl.pathname = '/api/auth'

    try {
        const response = await getRequest(reqUrl.href)

        if (response && response.isLoggedIn && response.data) return response.data
    } catch {}

    return null
}
