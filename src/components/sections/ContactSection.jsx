import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPhone, FiMapPin, FiMail, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { usePortfolio } from '../../context/PortfolioContext'
import { arabicProfileData } from '../../data/translations'

export default function ContactSection() {
  const { profile, addMessage, language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const isAr = language === 'ar'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(isAr ? 'جميع الحقول مطلوبة.' : 'All fields are required.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      addMessage(formData)
      toast.success(isAr ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 800)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-white dark:bg-dark-900">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            {t('contact.badge')}
          </span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Phone */}
            <div className={`glass-card dark:glass-card-dark p-6 flex items-start gap-4 border border-slate-200 dark:border-slate-800 ${
              isAr ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 flex-shrink-0">
                <FiPhone size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('contact.phone')}</h4>
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">{profile.phone || '01207169283'}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t('contact.phoneSub')}</p>
              </div>
            </div>

            {/* Email */}
            <div className={`glass-card dark:glass-card-dark p-6 flex items-start gap-4 border border-slate-200 dark:border-slate-800 ${
              isAr ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                <FiMail size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('contact.email')}</h4>
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">{profile.email || 'mahmoudaboulSaud@gmail.com'}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t('contact.emailSub')}</p>
              </div>
            </div>

            {/* Location */}
            <div className={`glass-card dark:glass-card-dark p-6 flex items-start gap-4 border border-slate-200 dark:border-slate-800 ${
              isAr ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-500 flex-shrink-0">
                <FiMapPin size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('contact.location')}</h4>
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {isAr ? arabicProfileData.address : (profile.address || 'El Minya, Egypt')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{t('contact.locationSub')}</p>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card dark:glass-card-dark p-8 border border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all ${
                        isAr ? 'text-right' : 'text-left'
                      }`}
                      required
                    />
                  </div>

                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-left"
                      required
                    />
                  </div>
                </div>

                <div className={isAr ? 'text-right' : 'text-left'}>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact.subjectLabel')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.subjectPlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all ${
                      isAr ? 'text-right' : 'text-left'
                    }`}
                    required
                  />
                </div>

                <div className={isAr ? 'text-right' : 'text-left'}>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder={t('contact.messagePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none ${
                      isAr ? 'text-right' : 'text-left'
                    }`}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-3.5"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSend size={16} /> {t('common.send')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
