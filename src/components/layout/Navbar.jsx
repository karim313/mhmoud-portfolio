import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiShield, FiGlobe } from 'react-icons/fi'
import { usePortfolio } from '../../context/PortfolioContext'

const NAV_LINKS = [
  { label: 'nav.hero', href: '#hero' },
  { label: 'nav.about', href: '#about' },
  { label: 'nav.diploma', href: '#diploma' },
  { label: 'nav.projects', href: '#projects' },
  { label: 'nav.analytics', href: '#analytics' },
  { label: 'nav.experience', href: '#experience' },
  { label: 'nav.contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme, language, toggleLanguage, t } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const isRtl = language === 'ar'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-white/20 dark:border-white/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-sm font-display">MA</span>
            </div>
            <div className={`hidden sm:block ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-display leading-tight">
                {t('hero.title1')} {t('hero.title2')}
              </p>
              <p className="text-xs text-primary-500 font-medium leading-tight">
                {t('hero.badge')}
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link text-sm font-medium ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {t(link.label)}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              aria-label="Change language"
            >
              <FiGlobe size={15} />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-900/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
            >
              <FiShield size={14} />
              {t('nav.admin')}
            </Link>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden mx-4 rounded-2xl glass-card dark:glass-card-dark shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isRtl ? 'text-right' : 'text-left'
                  } ${
                    activeSection === link.href.slice(1)
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {t(link.label)}
                </motion.button>
              ))}
              <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-700/50">
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all ${
                    isRtl ? 'flex-row-reverse' : ''
                  }`}
                >
                  <FiShield size={16} /> {t('nav.admin')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
