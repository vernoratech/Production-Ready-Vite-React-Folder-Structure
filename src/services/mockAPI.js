// Mock API service (auth uses live backend; other endpoints remain local JSON for now)
import apiClient from '@services/apiClient'

const BASE_URL = 'http://localhost:3001'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const STORAGE_KEYS = {
  accessToken: 'authAccessToken',
}

const mockAPI = {
  // Auth APIs (live)
  auth: {
    login: async (credentials) => {
      // Live login
      const data = await apiClient.post('/auth/login', credentials)
      if (data?.token) {
        localStorage.setItem(STORAGE_KEYS.accessToken, data.token)
      }
      return { data }
    },

    register: async (userData) => {
      // Live register
      const data = await apiClient.post('/auth/register', userData)
      if (data?.token) {
        localStorage.setItem(STORAGE_KEYS.accessToken, data.token)
      }
      return { data }
    },

    verifyToken: async () => {
      const token = localStorage.getItem(STORAGE_KEYS.accessToken)
      if (!token) throw new Error('No token')
      // If token exists, treat as authenticated (server will truly validate on API calls)
      return { id: 1, name: 'User', email: 'unknown@example.com', role: 'owner' }
    },

    refresh: async () => {
      // No refresh endpoint provided by live API yet
      throw new Error('Refresh not supported')
    },

    logout: async () => {
      localStorage.removeItem(STORAGE_KEYS.accessToken)
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
