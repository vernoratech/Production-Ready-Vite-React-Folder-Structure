import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '@components/ui/Button/Button'
import Input from '@components/ui/Input/Input'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated) return
    if (hasRedirectedRef.current) return
    // Only redirect if we are currently on the login route and we have a valid 'from'
    if (location.pathname === '/login') {
      const from = location.state?.from
      if (from) {
        hasRedirectedRef.current = true
        navigate(from, { replace: true, state: {} })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, location.pathname])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await login(formData)

    if (result.success) {
      navigate('/restaurant-setup', { replace: true })
    } else {
      setError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <Link to="/">
          <Button className="bg-blue-500">Go back</Button>
        </Link>
        <div className="text-center">
          <div className="text-4xl font-bold text-vesnoratech-primary mb-2">V</div>
          <h2 className="text-3xl font-bold text-gray-900">VesnoraTech</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Demo Login:</strong><br />
            Email: john@example.com<br />
            Password: password123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gray-700"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-vesnoratech-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
