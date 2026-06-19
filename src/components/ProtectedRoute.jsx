import { Navigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = usePortfolio()
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}
