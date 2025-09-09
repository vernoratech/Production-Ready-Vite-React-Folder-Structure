import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import mockAPI from '@services/mockAPI'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const establishSession = useCallback(async () => {
    try {
      const userData = await mockAPI.auth.verifyToken()
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    establishSession()
  }, [establishSession])

  const login = async (credentials) => {
    try {
      setIsLoading(true)
      const response = await mockAPI.auth.login(credentials)
      const { user: userData } = response.data
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true, user: userData }
    } catch (error) {
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
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSession = async () => {
    try {
      const res = await mockAPI.auth.refresh()
      const userData = await mockAPI.auth.verifyToken()
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const logout = () => {
    mockAPI.auth.logout()
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    refreshSession,
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
