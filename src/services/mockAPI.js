// Mock API service that simulates real API calls
const BASE_URL = 'http://localhost:3001'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Token utilities (simulate JWTs)
const createToken = (prefix) => `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`
const nowInSeconds = () => Math.floor(Date.now() / 1000)

// Token lifetimes (short access, longer refresh)
const ACCESS_TOKEN_TTL_SECONDS = 60 * 5 // 5 minutes
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

const STORAGE_KEYS = {
  accessToken: 'authAccessToken',
  refreshToken: 'authRefreshToken',
  accessExp: 'authAccessExp',
  refreshExp: 'authRefreshExp',
}

const persistTokens = ({ accessToken, refreshToken, accessExp, refreshExp }) => {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken)
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken)
  if (accessExp) localStorage.setItem(STORAGE_KEYS.accessExp, String(accessExp))
  if (refreshExp) localStorage.setItem(STORAGE_KEYS.refreshExp, String(refreshExp))
}

const readTokens = () => ({
  accessToken: localStorage.getItem(STORAGE_KEYS.accessToken),
  refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
  accessExp: Number(localStorage.getItem(STORAGE_KEYS.accessExp) || 0),
  refreshExp: Number(localStorage.getItem(STORAGE_KEYS.refreshExp) || 0),
})

const clearTokens = () => {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k))
}

const issueTokens = () => {
  const accessToken = createToken('access')
  const refreshToken = createToken('refresh')
  const accessExp = nowInSeconds() + ACCESS_TOKEN_TTL_SECONDS
  const refreshExp = nowInSeconds() + REFRESH_TOKEN_TTL_SECONDS
  persistTokens({ accessToken, refreshToken, accessExp, refreshExp })
  return { accessToken, refreshToken, accessExp, refreshExp }
}

const isTokenValid = (token, exp) => Boolean(token) && nowInSeconds() < Number(exp || 0)

const mockAPI = {
  // Auth APIs
  auth: {
    login: async (credentials) => {
      await delay(600)

      console.log("hello", credentials);


      if (credentials.email === 'Abhishek.jha@openspaceservices.com' && credentials.password === 'password123') {
        const user = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'owner'
        }

        const { accessToken, refreshToken, accessExp, refreshExp } = issueTokens()

        return { data: { token: accessToken, refreshToken, accessExp, refreshExp, user } }
      } else {
        throw new Error('Invalid credentials')
      }
    },

    register: async (userData) => {
      await delay(800)

      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'owner',
        created_at: new Date().toISOString()
      }

      const { accessToken, refreshToken, accessExp, refreshExp } = issueTokens()
      return { data: { token: accessToken, refreshToken, accessExp, refreshExp, user: newUser } }
    },

    verifyToken: async () => {
      await delay(300)
      const { accessToken, accessExp } = readTokens()

      if (isTokenValid(accessToken, accessExp)) {
        return {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'owner'
        }
      } else {
        throw new Error('Invalid or expired token')
      }
    },

    refresh: async () => {
      await delay(300)
      const { refreshToken, refreshExp } = readTokens()
      if (!isTokenValid(refreshToken, refreshExp)) {
        clearTokens()
        throw new Error('Refresh token invalid or expired')
      }
      const accessToken = createToken('access')
      const accessExp = nowInSeconds() + ACCESS_TOKEN_TTL_SECONDS
      persistTokens({ accessToken, accessExp })
      return { data: { token: accessToken, accessExp } }
    },

    logout: async () => {
      await delay(200)
      clearTokens()
      return { success: true }
    }
  },

  // Restaurant APIs
  restaurant: {
    getProfile: async () => {
      await delay(500)
      const response = await fetch(`${BASE_URL}/restaurants/1`)
      return response.json()
    },

    updateProfile: async (data) => {
      await delay(800)
      const response = await fetch(`${BASE_URL}/restaurants/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    }
  },

  // Menu APIs
  menu: {
    getCategories: async (restaurantId = 1) => {
      await delay(500)
      const response = await fetch(`${BASE_URL}/categories?restaurant_id=${restaurantId}`)
      return response.json()
    },

    getMenuItems: async (restaurantId = 1) => {
      await delay(500)
      const response = await fetch(`${BASE_URL}/menu_items?restaurant_id=${restaurantId}`)
      return response.json()
    },

    createMenuItem: async (item) => {
      await delay(800)
      const newItem = {
        ...item,
        id: Date.now(),
        created_at: new Date().toISOString()
      }

      const response = await fetch(`${BASE_URL}/menu_items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      return response.json()
    },

    updateMenuItem: async (id, item) => {
      await delay(800)
      const response = await fetch(`${BASE_URL}/menu_items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, updated_at: new Date().toISOString() })
      })
      return response.json()
    },

    deleteMenuItem: async (id) => {
      await delay(500)
      await fetch(`${BASE_URL}/menu_items/${id}`, {
        method: 'DELETE'
      })
      return { success: true }
    }
  },

  // Public APIs
  public: {
    getMenu: async (restaurantId) => {
      await delay(600)

      const [restaurant, categories, menuItems] = await Promise.all([
        fetch(`${BASE_URL}/restaurants/${restaurantId}`).then(r => r.json()),
        fetch(`${BASE_URL}/categories?restaurant_id=${restaurantId}`).then(r => r.json()),
        fetch(`${BASE_URL}/menu_items?restaurant_id=${restaurantId}`).then(r => r.json())
      ])

      return {
        restaurant,
        categories,
        menuItems
      }
    }
  }
}

export default mockAPI
