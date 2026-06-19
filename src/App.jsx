import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PortfolioProvider } from './context/PortfolioContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <PortfolioProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </PortfolioProvider>
  )
}
