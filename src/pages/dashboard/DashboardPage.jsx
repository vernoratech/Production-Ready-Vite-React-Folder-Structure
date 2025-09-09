import { useAuth } from '../../context/AuthContext'
import Button from '@components/ui/Button/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from '@components/ui/Modal/Modal'
import Input from '@components/ui/Input/Input'

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', mobile: '' })

  useEffect(() => {
    if (location.state?.showProfileModal) {
      setOpen(true)
      // clear the flag so refreshing dashboard doesn't reopen it
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const onChange = (e) => setProfileForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // Here you can call an API to save profileForm
    setOpen(false)
  }

  return (
    <div className="p-6">
      <Modal open={open} onClose={() => setOpen(false)} title="Complete your profile">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Full name"
            name="name"
            value={profileForm.name}
            onChange={onChange}
            required
          />
          <Input
            label="Mobile number"
            name="mobile"
            placeholder="e.g. 9876543210"
            value={profileForm.mobile}
            onChange={onChange}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your restaurant and digital menus from here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Menu Items</h3>
          <p className="text-3xl font-bold text-vesnoratech-primary">24</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
          <p className="text-3xl font-bold text-green-600">4</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Scans Today</h3>
          <p className="text-3xl font-bold text-blue-600">127</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Items</h3>
          <p className="text-3xl font-bold text-purple-600">22</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/menu/1" className="block">
              <Button variant="ghost" className="w-full justify-start">
                👁️ View Public Menu
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              📱 Download QR Code
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              ➕ Add Menu Item
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              ⚙️ Restaurant Settings
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                ✅
              </div>
              <div>
                <p className="text-sm font-medium">Menu item "Butter Chicken" updated</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                📱
              </div>
              <div>
                <p className="text-sm font-medium">QR code scanned 23 times</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                ➕
              </div>
              <div>
                <p className="text-sm font-medium">New category "Beverages" added</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="danger" onClick={logout}>
          Logout
        </Button>
        <Button onClick={() => setOpen(true)}>Open Profile Modal</Button>
      </div>
    </div>
  )
}

export default DashboardPage
