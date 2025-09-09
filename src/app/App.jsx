import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { AuthProvider } from '../context/AuthContext'
import Loading from '@components/ui/Loading/Loading'
import ProtectedRoute from '../router/ProtectedRoute'

// Pages
import LandingPage from '@pages/public/LandingPage'
import LoginPage from '@pages/auth/LoginPage'
import DashboardPage from '@pages/dashboard/DashboardPage'
import MenuDisplayPage from '@pages/public/MenuDisplayPage'
import RegisterPage from '../pages/auth/RegisterPage'
import RestaurantFormPage from '../pages/dashboard/restaurantFormPage'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Suspense fallback={<Loading overlay text="Loading..." />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu/:restaurantId" element={<MenuDisplayPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurant-setup" element={
              <ProtectedRoute>
                <RestaurantFormPage />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App
