import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiLayout, FiFolder, FiAward, FiSettings, FiMail, FiLogOut, FiPlus, FiTrash2,
  FiEdit, FiEye, FiCheck, FiUser, FiInfo, FiSliders, FiActivity
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { usePortfolio } from '../../context/PortfolioContext'

export default function AdminDashboard() {
  const {
    profile, updateProfile,
    projects, addProject, updateProject, deleteProject,
    certificates, addCertificate, updateCertificate, deleteCertificate,
    skills, addSkill, updateSkill, deleteSkill,
    messages, markMessageRead, deleteMessage,
    visitorCount, logout
  } = usePortfolio()

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // ─── Modal States ──────────────────────────────────────────────────
  const [projectModal, setProjectModal] = useState({ open: false, mode: 'create', data: null })
  const [certModal, setCertModal] = useState({ open: false, mode: 'create', data: null })
  const [skillModal, setSkillModal] = useState({ open: false, mode: 'create', data: null })
  const [viewMessage, setViewMessage] = useState(null)

  // ─── Form States ──────────────────────────────────────────────────
  const [projectForm, setProjectForm] = useState({ name: '', description: '', technologies: '', githubUrl: '', demoUrl: '', category: 'Power BI', featured: false })
  const [certForm, setCertForm] = useState({ title: '', organization: '', date: '', credentialUrl: '' })
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, category: 'BI Tools', icon: 'SiPowerbi', color: '#6366f1' })
  const [profileForm, setProfileForm] = useState({ ...profile })

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }

  // ─── CRUD Action Handlers ──────────────────────────────────────────
  const handleSaveProject = (e) => {
    e.preventDefault()
    const techArray = typeof projectForm.technologies === 'string'
      ? projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : projectForm.technologies

    const payload = { ...projectForm, technologies: techArray }

    if (projectModal.mode === 'create') {
      addProject(payload)
      toast.success('Project added!')
    } else {
      updateProject(projectModal.data.id, payload)
      toast.success('Project updated!')
    }
    setProjectModal({ open: false, mode: 'create', data: null })
  }

  const handleSaveCert = (e) => {
    e.preventDefault()
    if (certModal.mode === 'create') {
      addCertificate(certForm)
      toast.success('Certificate added!')
    } else {
      updateCertificate(certModal.data.id, certForm)
      toast.success('Certificate updated!')
    }
    setCertModal({ open: false, mode: 'create', data: null })
  }

  const handleSaveSkill = (e) => {
    e.preventDefault()
    if (skillModal.mode === 'create') {
      addSkill(skillForm)
      toast.success('Skill added!')
    } else {
      updateSkill(skillModal.data.id, skillForm)
      toast.success('Skill updated!')
    }
    setSkillModal({ open: false, mode: 'create', data: null })
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    toast.success('Profile updated!')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-6">
        <div>
          {/* Logo / Title */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-white font-display">
              MA
            </div>
            <div>
              <p className="font-bold text-white font-display text-sm">Mahmoud Saud</p>
              <p className="text-xs text-slate-500">BI Admin Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: FiLayout },
              { id: 'projects', label: 'Projects', icon: FiFolder },
              { id: 'certificates', label: 'Certifications', icon: FiAward },
              { id: 'skills', label: 'Skills Management', icon: FiSliders },
              { id: 'profile', label: 'Profile Settings', icon: FiSettings },
              { id: 'messages', label: `Messages (${messages.filter(m => !m.read).length})`, icon: FiMail },
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <FiLogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {/* Tab content conditional rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-black text-white">Dashboard Overview</h1>
                  <p className="text-sm text-slate-400 mt-1">Live metrics and analytical summary of the portfolio</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Projects', value: projects.length, icon: FiFolder, color: 'text-indigo-400 bg-indigo-500/10' },
                    { label: 'Total Certificates', value: certificates.length, icon: FiAward, color: 'text-amber-400 bg-amber-500/10' },
                    { label: 'Total Visitors', value: visitorCount, icon: FiActivity, color: 'text-emerald-400 bg-emerald-500/10' },
                    { label: 'Messages Count', value: messages.length, icon: FiMail, color: 'text-pink-400 bg-pink-500/10' },
                  ].map(stat => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-slate-400 font-semibold">{stat.label}</span>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <Icon size={18} />
                          </div>
                        </div>
                        <p className="text-3xl font-black text-white font-display">{stat.value}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Recent Messages list */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-4 font-display">Recent Inquiries</h3>
                  {messages.length > 0 ? (
                    <div className="divide-y divide-slate-800">
                      {messages.slice(0, 3).map(msg => (
                        <div key={msg.id} className="py-4 flex justify-between items-center gap-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-200">{msg.name} ({msg.email})</p>
                            <p className="text-xs text-slate-400 mt-1">{msg.subject}</p>
                          </div>
                          {!msg.read && (
                            <span className="px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold">New</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No inquiries yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-black text-white">Project Portfolio</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage and curate project portfolio showcase cards</p>
                  </div>
                  <button
                    onClick={() => {
                      setProjectForm({ name: '', description: '', technologies: '', githubUrl: '', demoUrl: '', category: 'Power BI', featured: false })
                      setProjectModal({ open: true, mode: 'create', data: null })
                    }}
                    className="btn-primary"
                  >
                    <FiPlus /> Add Project
                  </button>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800">
                          <th className="p-4 font-semibold text-slate-400">Name</th>
                          <th className="p-4 font-semibold text-slate-400">Category</th>
                          <th className="p-4 font-semibold text-slate-400">Technologies</th>
                          <th className="p-4 font-semibold text-slate-400 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {projects.map(p => (
                          <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-semibold text-white">{p.name} {p.featured && '⭐'}</td>
                            <td className="p-4 text-slate-400">{p.category}</td>
                            <td className="p-4 text-slate-400">{p.technologies.join(', ')}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setProjectForm({ ...p, technologies: p.technologies.join(', ') })
                                  setProjectModal({ open: true, mode: 'edit', data: p })
                                }}
                                className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiEdit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  deleteProject(p.id)
                                  toast.success('Project deleted!')
                                }}
                                className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATIONS MANAGEMENT */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-black text-white">Certifications</h1>
                    <p className="text-sm text-slate-400 mt-1">Add, update, and manage professional certifications</p>
                  </div>
                  <button
                    onClick={() => {
                      setCertForm({ title: '', organization: '', date: '', credentialUrl: '' })
                      setCertModal({ open: true, mode: 'create', data: null })
                    }}
                    className="btn-primary"
                  >
                    <FiPlus /> Add Certificate
                  </button>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800">
                          <th className="p-4 font-semibold text-slate-400">Title</th>
                          <th className="p-4 font-semibold text-slate-400">Organization</th>
                          <th className="p-4 font-semibold text-slate-400">Date</th>
                          <th className="p-4 font-semibold text-slate-400 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {certificates.map(c => (
                          <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-semibold text-white">{c.title}</td>
                            <td className="p-4 text-slate-400">{c.organization}</td>
                            <td className="p-4 text-slate-400">{c.date}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setCertForm(c)
                                  setCertModal({ open: true, mode: 'edit', data: c })
                                }}
                                className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiEdit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  deleteCertificate(c.id)
                                  toast.success('Certificate deleted!')
                                }}
                                className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {certificates.length === 0 && (
                          <tr>
                            <td colSpan="4" className="p-8 text-center text-slate-500">No certificates added. Empty state is currently active on public site.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLS MANAGEMENT */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-black text-white">Skills Matrix</h1>
                    <p className="text-sm text-slate-400 mt-1">Configure expertise levels, classifications, and custom accents</p>
                  </div>
                  <button
                    onClick={() => {
                      setSkillForm({ name: '', level: 80, category: 'BI Tools', icon: 'SiPowerbi', color: '#6366f1' })
                      setSkillModal({ open: true, mode: 'create', data: null })
                    }}
                    className="btn-primary"
                  >
                    <FiPlus /> Add Skill
                  </button>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800">
                          <th className="p-4 font-semibold text-slate-400">Name</th>
                          <th className="p-4 font-semibold text-slate-400">Category</th>
                          <th className="p-4 font-semibold text-slate-400">Level</th>
                          <th className="p-4 font-semibold text-slate-400 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {skills.map(s => (
                          <tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-semibold text-white flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                              {s.name}
                            </td>
                            <td className="p-4 text-slate-400">{s.category}</td>
                            <td className="p-4 text-slate-400">{s.level}%</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSkillForm(s)
                                  setSkillModal({ open: true, mode: 'edit', data: s })
                                }}
                                className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiEdit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  deleteSkill(s.id)
                                  toast.success('Skill deleted!')
                                }}
                                className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE MANAGEMENT */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-black text-white">Profile Customization</h1>
                  <p className="text-sm text-slate-400 mt-1">Configure global display strings, contact details, and landing information</p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Display Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Personal Quote</label>
                        <input
                          type="text"
                          value={profileForm.quote}
                          onChange={(e) => setProfileForm(p => ({ ...p, quote: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Profile Image URL</label>
                      <input
                        type="url"
                        value={profileForm.profileImage || ''}
                        onChange={(e) => setProfileForm(p => ({ ...p, profileImage: e.target.value }))}
                        placeholder="https://i.imgur.com/your-photo.jpg"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      />
                      <p className="text-xs text-slate-500 mt-1.5">Paste a direct image link (Imgur, Cloudinary, GitHub, etc). Displayed in the Hero section.</p>
                      {profileForm.profileImage && (
                        <div className="mt-3 w-16 h-16 rounded-full overflow-hidden border border-slate-700">
                          <img src={profileForm.profileImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Contact Phone</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location / Address</label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm(p => ({ ...p, address: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Professional Summary</label>
                      <textarea
                        value={profileForm.about}
                        onChange={(e) => setProfileForm(p => ({ ...p, about: e.target.value }))}
                        rows="6"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      <FiCheck /> Update Settings
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* MESSAGES / INQUIRIES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-black text-white">Client Inquiries</h1>
                  <p className="text-sm text-slate-400 mt-1">Review contact inquiries, view messages, and clear processed entries</p>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  {messages.length > 0 ? (
                    <div className="divide-y divide-slate-800">
                      {messages.map(msg => (
                        <div key={msg.id} className={`p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${!msg.read ? 'bg-slate-900/30' : ''}`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <p className="text-sm font-semibold text-slate-200">{msg.name}</p>
                              {!msg.read && (
                                <span className="px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-[10px] font-bold">NEW</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{msg.email} • {new Date(msg.createdAt).toLocaleDateString()}</p>
                            <p className="text-xs font-semibold text-slate-300 mt-2">Subject: {msg.subject}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => {
                                setViewMessage(msg)
                                markMessageRead(msg.id)
                              }}
                              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                              title="Read Message"
                            >
                              <FiEye size={14} />
                            </button>
                            <button
                              onClick={() => {
                                deleteMessage(msg.id)
                                toast.success('Message deleted')
                              }}
                              className="p-2.5 bg-slate-800 hover:bg-rose-600/25 text-slate-400 hover:text-white rounded-xl transition-all"
                              title="Delete Message"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-500">No messages found.</div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── MODALS ────────────────────────────────────────────────────── */}

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {projectModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-lg font-bold text-white mb-4 font-display">
                {projectModal.mode === 'create' ? 'Create Project' : 'Edit Project'}
              </h3>
              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))}
                    placeholder="Power BI, SQL, Python, Excel"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="Power BI">Power BI</option>
                      <option value="Analytics">Analytics</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Retail">Retail</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm(p => ({ ...p, featured: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 accent-primary-500"
                    />
                    <label htmlFor="featured" className="text-xs font-semibold text-slate-400">Featured Card</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">GitHub URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.demoUrl}
                      onChange={(e) => setProjectForm(p => ({ ...p, demoUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2 text-xs">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE MODAL */}
      <AnimatePresence>
        {certModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 font-display">
                {certModal.mode === 'create' ? 'Add Certificate' : 'Edit Certificate'}
              </h3>
              <form onSubmit={handleSaveCert} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Certificate Title</label>
                  <input
                    type="text"
                    value={certForm.title}
                    onChange={(e) => setCertForm(c => ({ ...c, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Organization</label>
                  <input
                    type="text"
                    value={certForm.organization}
                    onChange={(e) => setCertForm(c => ({ ...c, organization: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Date / Month</label>
                  <input
                    type="text"
                    value={certForm.date}
                    onChange={(e) => setCertForm(c => ({ ...c, date: e.target.value }))}
                    placeholder="e.g. June 2024"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Credential Verification URL</label>
                  <input
                    type="url"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm(c => ({ ...c, credentialUrl: e.target.value }))}
                    placeholder="https://cred.ly/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setCertModal({ open: false, mode: 'create', data: null })}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2 text-xs">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SKILL MODAL */}
      <AnimatePresence>
        {skillModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 font-display">
                {skillModal.mode === 'create' ? 'Add Skill' : 'Edit Skill'}
              </h3>
              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Skill Name</label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Proficiency Level (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm(s => ({ ...s, level: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm(s => ({ ...s, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="BI Tools">BI Tools</option>
                      <option value="Database">Database</option>
                      <option value="Analysis">Analysis</option>
                      <option value="Programming">Programming</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Analytics">Analytics</option>
                      <option value="Data Engineering">Data Engineering</option>
                      <option value="AI">AI</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Icon Class</label>
                    <input
                      type="text"
                      value={skillForm.icon}
                      onChange={(e) => setSkillForm(s => ({ ...s, icon: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Accent Color (Hex)</label>
                    <input
                      type="text"
                      value={skillForm.color}
                      onChange={(e) => setSkillForm(s => ({ ...s, color: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setSkillModal({ open: false, mode: 'create', data: null })}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2 text-xs">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MESSAGE READER MODAL */}
      <AnimatePresence>
        {viewMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <FiMail size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{viewMessage.name}</h3>
                  <p className="text-xs text-slate-400">{viewMessage.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject</span>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5">{viewMessage.subject}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inquiry Message</span>
                  <div className="bg-slate-950 p-4 rounded-xl text-sm text-slate-300 mt-1 border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                    {viewMessage.message}
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setViewMessage(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
                  >
                    Close Reader
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
