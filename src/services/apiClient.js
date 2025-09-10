const BASE_URL = 'https://web-production-c660.up.railway.app/vernora-api/api'

const STORAGE_KEYS = {
  accessToken: 'authAccessToken',
}

const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.accessToken)

const request = async (path, { method = 'GET', body, headers = {} } = {}) => {
  try {
    const token = getAccessToken()
    const reqHeaders = new Headers(headers)
    reqHeaders.set('Accept', 'application/json')

    if (!(body instanceof FormData)) {
      reqHeaders.set('Content-Type', 'application/json')
    }

    if (token) {
      reqHeaders.set('Authorization', `Bearer ${token}`)
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: reqHeaders,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      cache: 'no-cache',
    })

    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const data = isJson ? await res.json().catch(() => ({})) : await res.text()

    if (!res.ok) {
      const message = (isJson && (data?.message || data?.error)) || res.statusText
      const error = new Error(message || 'Request failed')
      error.status = res.status
      error.data = data
      throw error
    }

    return data
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection.')
    }
    throw error
  }
}

const apiClient = {
  post: (path, body, headers) => request(path, { method: 'POST', body, headers }),
  get: (path, headers) => request(path, { method: 'GET', headers }),
  put: (path, body, headers) => request(path, { method: 'PUT', body, headers }),
  delete: (path, headers) => request(path, { method: 'DELETE', headers }),
}

export default apiClient
