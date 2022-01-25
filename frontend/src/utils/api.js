import { getRequest, postRequest } from './http'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || window.location.origin

const getApiHref = (path) => {
    const reqUrl = new URL(apiBaseUrl)
    reqUrl.pathname = path

    return reqUrl.href
}

export const getAuthenticatedAccount = async () => {
    try {
        const response = await getRequest(getApiHref('/api/auth'))

        if (response && response.isLoggedIn && response.data) return response.data
    } catch {}

    return null
}

export const accountLogin = async (data) => {
    try {
        const response = await postRequest(getApiHref('/api/auth/login'), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}