import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '@components/ui/Input/Input'
import Button from '@components/ui/Button/Button'

const RegisterPage = () => {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill out all fields')
      return
    }

    const result = await register(form)
    if (result.success) {
      navigate('/restaurant-setup', { replace: true })
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-gray-500 text-sm">Start managing your restaurant today</p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Full name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={onChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={onChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            required
          />

          <Button type="submit" className="w-full" loading={isLoading}>
            Create account
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-vesnoratech-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
