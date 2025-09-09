// Lightweight HTTP wrapper that attaches access token and auto-refreshes on 401
import mockAPI from '@services/mockAPI'

const STORAGE_KEYS = {
  accessToken: 'authAccessToken',
}

const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.accessToken)

const http = async (input, init = {}) => {
  const headers = new Headers(init.headers || {})
  const token = getAccessToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const doFetch = () => fetch(input, { ...init, headers })

  let response = await doFetch()
  if (response.status !== 401) return response

  try {
    // Attempt to refresh token
    const { data } = await mockAPI.auth.refresh()
    if (data?.token) {
      // Retry original request with new token
      const retryHeaders = new Headers(init.headers || {})
      retryHeaders.set('Authorization', `Bearer ${data.token}`)
      response = await fetch(input, { ...init, headers: retryHeaders })
    }
  } catch (e) {
    // Refresh failed; allow 401 to propagate
  }

  return response
}

export default http


