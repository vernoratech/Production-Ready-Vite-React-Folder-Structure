import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import mockAPI from '@services/mockAPI'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await mockAPI.auth.verifyToken()
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        // Only log errors that aren't "No token" (which is expected when not logged in)
        if (error.message !== 'No token') {
          console.error('Auth check failed:', error)
        }
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setIsLoading(true)
      const response = await mockAPI.auth.login(credentials)

      const { user: userData } = response.data

      setUser(userData)
      setIsAuthenticated(true)

      return { success: true, user: userData }
    } catch (error) {
      console.error('Login failed:', error)
      return {
        success: false,
        error: error.message || 'Login failed'
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setIsLoading(true)
      const response = await mockAPI.auth.register(userData)

      const { user: newUser } = response.data

      setUser(newUser)
      setIsAuthenticated(true)

      return { success: true, user: newUser }
    } catch (error) {
      console.error('Registration failed:', error)
      return {
        success: false,
        error: error.message || 'Registration failed'
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await mockAPI.auth.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      navigate('/login', { replace: true })
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
