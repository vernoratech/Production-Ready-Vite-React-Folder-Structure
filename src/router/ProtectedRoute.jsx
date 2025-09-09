import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '@components/ui/Loading/Loading'

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const location = useLocation()
  const setupCompleted = localStorage.getItem('restaurantSetupCompleted') === 'true'

  if (isLoading) {
    return <Loading overlay text="Checking authentication..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={redirectPath}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  // If trying to access dashboard without completing setup, force setup first
  if (location.pathname.startsWith('/dashboard') && !setupCompleted) {
    return <Navigate to="/restaurant-setup" replace />
  }

  return children
}

export default ProtectedRoute
