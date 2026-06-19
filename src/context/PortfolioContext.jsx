import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  storage,
  STORAGE_KEYS,
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
  DEFAULT_PROFILE,
} from '../data/portfolioData'

import { translations } from '../data/translations'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  // ─── Language & Translation ───────────────────────────────────────
  const [language, setLanguage] = useState(() => storage.get('portfolio_language', 'en'))

  useEffect(() => {
    const root = document.documentElement
    root.dir = language === 'ar' ? 'rtl' : 'ltr'
    root.lang = language
    storage.set('portfolio_language', language)
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }, [])

  const t = useCallback((path) => {
    const keys = path.split('.')
    let result = translations[language]
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key]
      } else {
        return path
      }
    }
    return result
  }, [language])

  // ─── Theme ────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => storage.get(STORAGE_KEYS.THEME, 'dark'))

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    storage.set(STORAGE_KEYS.THEME, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  // ─── Profile ──────────────────────────────────────────────────────
  const [profile, setProfile] = useState(() =>
    storage.get(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  )

  const updateProfile = useCallback((data) => {
    setProfile(prev => {
      const updated = { ...prev, ...data }
      storage.set(STORAGE_KEYS.PROFILE, updated)
      return updated
    })
  }, [])

  // ─── Projects ─────────────────────────────────────────────────────
  const [projects, setProjects] = useState(() =>
    storage.get(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
  )

  const addProject = useCallback((project) => {
    const newProject = { ...project, id: Date.now().toString(), createdAt: new Date().toISOString() }
    setProjects(prev => {
      const updated = [...prev, newProject]
      storage.set(STORAGE_KEYS.PROJECTS, updated)
      return updated
    })
    return newProject
  }, [])

  const updateProject = useCallback((id, data) => {
    setProjects(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...data } : p)
      storage.set(STORAGE_KEYS.PROJECTS, updated)
      return updated
    })
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id)
      storage.set(STORAGE_KEYS.PROJECTS, updated)
      return updated
    })
  }, [])

  // ─── Certificates ─────────────────────────────────────────────────
  const [certificates, setCertificates] = useState(() =>
    storage.get(STORAGE_KEYS.CERTIFICATES, [])
  )

  const addCertificate = useCallback((cert) => {
    const newCert = { ...cert, id: Date.now().toString(), createdAt: new Date().toISOString() }
    setCertificates(prev => {
      const updated = [...prev, newCert]
      storage.set(STORAGE_KEYS.CERTIFICATES, updated)
      return updated
    })
  }, [])

  const updateCertificate = useCallback((id, data) => {
    setCertificates(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, ...data } : c)
      storage.set(STORAGE_KEYS.CERTIFICATES, updated)
      return updated
    })
  }, [])

  const deleteCertificate = useCallback((id) => {
    setCertificates(prev => {
      const updated = prev.filter(c => c.id !== id)
      storage.set(STORAGE_KEYS.CERTIFICATES, updated)
      return updated
    })
  }, [])

  // ─── Skills ───────────────────────────────────────────────────────
  const [skills, setSkills] = useState(() =>
    storage.get(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS)
  )

  const addSkill = useCallback((skill) => {
    const newSkill = { ...skill, id: Date.now().toString() }
    setSkills(prev => {
      const updated = [...prev, newSkill]
      storage.set(STORAGE_KEYS.SKILLS, updated)
      return updated
    })
  }, [])

  const updateSkill = useCallback((id, data) => {
    setSkills(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...data } : s)
      storage.set(STORAGE_KEYS.SKILLS, updated)
      return updated
    })
  }, [])

  const deleteSkill = useCallback((id) => {
    setSkills(prev => {
      const updated = prev.filter(s => s.id !== id)
      storage.set(STORAGE_KEYS.SKILLS, updated)
      return updated
    })
  }, [])

  // ─── Messages ─────────────────────────────────────────────────────
  const [messages, setMessages] = useState(() =>
    storage.get(STORAGE_KEYS.MESSAGES, [])
  )

  const addMessage = useCallback((message) => {
    const newMsg = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    }
    setMessages(prev => {
      const updated = [newMsg, ...prev]
      storage.set(STORAGE_KEYS.MESSAGES, updated)
      return updated
    })
  }, [])

  const markMessageRead = useCallback((id) => {
    setMessages(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, read: true } : m)
      storage.set(STORAGE_KEYS.MESSAGES, updated)
      return updated
    })
  }, [])

  const deleteMessage = useCallback((id) => {
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== id)
      storage.set(STORAGE_KEYS.MESSAGES, updated)
      return updated
    })
  }, [])

  // ─── Visitor Counter ──────────────────────────────────────────────
  const [visitorCount, setVisitorCount] = useState(() => {
    const count = storage.get(STORAGE_KEYS.VISITORS, 0)
    const visited = sessionStorage.getItem('visited')
    if (!visited) {
      sessionStorage.setItem('visited', 'true')
      const newCount = count + 1
      storage.set(STORAGE_KEYS.VISITORS, newCount)
      return newCount
    }
    return count
  })

  // ─── Auth ─────────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    storage.get(STORAGE_KEYS.AUTH, false)
  )

  const login = useCallback((password) => {
    if (password === 'Mahmoud@2026') {
      storage.set(STORAGE_KEYS.AUTH, true)
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.AUTH)
    setIsAuthenticated(false)
  }, [])

  const value = {
    // Theme
    theme,
    toggleTheme,
    // Profile
    profile,
    updateProfile,
    // Projects
    projects,
    addProject,
    updateProject,
    deleteProject,
    // Certificates
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    // Skills
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    // Messages
    messages,
    addMessage,
    markMessageRead,
    deleteMessage,
    // Stats
    visitorCount,
    // Language
    language,
    toggleLanguage,
    t,
    // Auth
    isAuthenticated,
    login,
    logout,
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider')
  return context
}
