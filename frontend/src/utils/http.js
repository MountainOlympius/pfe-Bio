const defaultHeaders = { 'Content-Type': 'application/json' }

const httpRequest = async (url, method, body, headers = {}) => {
    let data = null
    const options = {
        method,
        headers,
        credentials: 'include'
    }

    if (body) options.body = body

    const response = await fetch(url, options)
    const contentType = response.headers.get('Content-Type') || response.headers.get('content-type')

    // Must convert to other data format if necessary
    if (/json/.test(contentType)) {
        data = await response.json()
    } else {
        data = await response.text()
    }
    
    return data
}

export const getRequest = (url) => httpRequest(url, 'GET', null)

export const postRequest = (url, body, headers = {}) => httpRequest(url, 'POST', body, {...defaultHeaders, ...headers})

export const putRequest = (url, body, headers = {}) => httpRequest(url, 'PUT', body, {...defaultHeaders, ...headers})

export const deleteRequest = (url, body = null, headers = {}) => httpRequest(url, 'DELETE', body, {...defaultHeaders, ...headers})