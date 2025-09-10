import React, { useState } from 'react'
import Button from '@components/ui/Button/Button'
import Input from '@components/ui/Input/Input'
import TemplateSelector from '@components/ui/TemplateSelector/TemplateSelector'
import { useNavigate } from 'react-router-dom'

const RestaurantFormPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    logo_url: '',
    working_hours: '',
    template_id: 1,
    primary_color: '#007bff',
    secondary_color: '#6b7280'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }

    setLoading(true)
    try {
      // Store restaurant data locally for now (until live API endpoints are available)
      const restaurantData = {
        name: form.name,
        description: form.description,
        address: form.address,
        phone: form.phone,
        email: form.email,
        logo_url: form.logo_url,
        working_hours: form.working_hours,
        template_id: Number(form.template_id) || 1,
        primary_color: form.primary_color,
        secondary_color: form.secondary_color,
        updated_at: new Date().toISOString()
      }

      // Store in localStorage for now
      localStorage.setItem('restaurantData', JSON.stringify(restaurantData))
      localStorage.setItem('restaurantSetupCompleted', 'true')

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      navigate('/dashboard', { replace: true })
    } catch (e2) {
      setError(e2.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-1">Restaurant setup</h1>
        <p className="text-gray-600 mb-6">Please provide details to continue to your dashboard.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <Input label="Restaurant name" name="name" value={form.name} onChange={onChange} required />
          </div>
          <div className="md:col-span-1">
            <Input label="Contact email" name="email" type="email" value={form.email} onChange={onChange} required />
          </div>

          <div className="md:col-span-2">
            <Input label="Description" name="description" value={form.description} onChange={onChange} />
          </div>

          <div className="md:col-span-2">
            <Input label="Address" name="address" value={form.address} onChange={onChange} />
          </div>

          <div className="md:col-span-1">
            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />
          </div>
          <div className="md:col-span-1">
            <Input label="Logo URL" name="logo_url" value={form.logo_url} onChange={onChange} />
          </div>

          <div className="md:col-span-2">
            <Input label="Working hours (JSON or text)" name="working_hours" value={form.working_hours} onChange={onChange} />
          </div>

          <div className="md:col-span-2">
            <TemplateSelector
              selectedId={form.template_id}
              onChange={(id) => setForm(f => ({ ...f, template_id: id }))}
            />
          </div>

          <div className="md:col-span-1">
            <Input label="Primary color" name="primary_color" type="text" value={form.primary_color} onChange={onChange} />
          </div>
          <div className="md:col-span-1">
            <Input label="Secondary color" name="secondary_color" type="text" value={form.secondary_color} onChange={onChange} />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <Button type="submit" loading={loading}>Save and continue</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RestaurantFormPage

// name
// Restaurant name (VARCHAR 255)
// NOT NULL, UNIQUE per user
// description
// Detailed restaurant description (TEXT)
// NULL allowed
// address
// Physical location address (TEXT)
// NULL allowed
// phone
// Contact phone number (VARCHAR 20)
// NULL allowed
// email
// Contact email address (VARCHAR 255)
// EMAIL format validation
// logo_url
// URL path to restaurant logo (VARCHAR 500)
// NULL allowed
// working_hours
// JSON object storing daily operating hours
// JSON format, NULL allowed
// template_id
// Reference to UI template (INT)
// DEFAULT 1
// primary_color
// Hex color code for primary branding (VARCHAR 7)
// DEFAULT '#007bff', HEX format
// secondary_color