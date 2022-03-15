import { deleteRequest, getRequest, postRequest, putRequest } from './http'

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

export const getPhylums = async () => {
    try {
        const response = await getRequest(getApiHref('/api/phylum'))

        if (response) return response
    } catch {}

    return null
}

export const deletePhylum = async (id) => {
    try {
        const response = await deleteRequest(getApiHref(`/api/phylum/${id}`))

        if (response) return response
    } catch {}

    return null
}

export const createPhylum = async (data) => {
    try {
        const response = await postRequest(getApiHref('/api/phylum'), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}

export const getPhylum = async (id) => {
    try {
        const response = await getRequest(getApiHref(`/api/phylum/${id}`))

        if (response) return response
    } catch {}

    return null
}

export const updatePhylum = async (id, data) => {
    try {
        const response = await putRequest(getApiHref(`/api/phylum/${id}`), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}

export const getFamilies = async (page) => {
    try {
        const response = await getRequest(getApiHref('/api/family') + `?page=${page}`)

        if (response) return response
    } catch {}

    return null
}

export const searchFamily = async (query) => {
    try {
        const response = await getRequest(getApiHref('/api/family/search') + `?query=${query}`)

        if (response) return response
    } catch {}

    return null
}

export const createFamily = async (data) => {
    try {
        const response = await postRequest(getApiHref('/api/family'), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}

export const addFamilyCriteria = async (id, content) => {
    try {
        const response = await postRequest(getApiHref(`/api/family/${id}/criteria`), JSON.stringify({ content }))

        if (response) return response
    } catch {}

    return null
}

export const getFamily = async (id) => {
    try {
        const response = await getRequest(getApiHref(`/api/family/${id}`))

        if (response) return response
    } catch {}

    return null
}

export const updateFamily = async (id, data) => {
    try {
        const response = await putRequest(getApiHref(`/api/family/${id}`), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}

export const deleteFamilyCriteria = async (familyId, criteriaId) => {
    try {
        const response = await deleteRequest(getApiHref(`/api/family/${familyId}/criteria/${criteriaId}`))

        if (response) return response
    } catch {}

    return null
}

export const deleteFamily = async (id) => {
    try {
        const response = await deleteRequest(getApiHref(`/api/family/${id}`))

        if (response) return response
    } catch {}

    return null
}

export const getGenuses = async (page) => {
    try {
        const response = await getRequest(getApiHref('/api/genus') + `?page=${page}`)

        if (response) return response
    } catch {}

    return null
}

export const searchGenus = async (query) => {
    try {
        const response = await getRequest(getApiHref('/api/genus/search') + `?query=${query}`)

        if (response) return response
    } catch {}

    return null
}

export const createGenus = async (data) => {
    try {
        const response = await postRequest(getApiHref('/api/genus'), JSON.stringify(data))

        if (response) return response
    } catch {}

    return null
}