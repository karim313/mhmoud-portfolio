import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiArrowLeft, FiShield } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { usePortfolio } from '../../context/PortfolioContext'

export default function AdminLogin() {
  const { login } = usePortfolio()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password) {
      toast.error('Please enter the password.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const success = login(password)
      setLoading(false)
      if (success) {
        toast.success('Successfully logged in!')
        navigate('/admin')
      } else {
        toast.error('Invalid password. Please try again.')
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Floating home button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <FiArrowLeft /> Back to Site
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <FiShield size={24} className="text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-display font-black text-slate-900 dark:text-white mb-2">
          Admin Gateway
        </h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Enter credentials to access the portfolio administration panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card dark:glass-card-dark py-8 px-6 sm:px-10 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Administrator Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={16} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
