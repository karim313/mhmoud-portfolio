import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiExternalLink, FiCalendar, FiBookOpen } from 'react-icons/fi'
import { usePortfolio } from '../../context/PortfolioContext'

export default function CertificationsSection() {
  const { certificates, language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isAr = language === 'ar'

  return (
    <section id="certifications" className="py-28 relative overflow-hidden bg-white dark:bg-dark-900">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            {t('certifications.badge')}
          </span>
          <h2 className="section-title">{t('certifications.title')}</h2>
          <p className="section-subtitle">
            {t('certifications.subtitle')}
          </p>
        </motion.div>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`glass-card dark:glass-card-dark overflow-hidden hover-lift group border border-slate-200 dark:border-slate-800 ${
                  isAr ? 'text-right' : 'text-left'
                }`}
              >
                {/* Certificate Image or Mock Graphic */}
                <div className="h-44 relative bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <FiAward size={48} className="text-primary-500 animate-pulse-slow" />
                      <span className="text-xs font-mono tracking-wider uppercase">
                        {isAr ? 'تم التحقق من الشهادة' : 'Credentials Verified'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className={`absolute bottom-4 left-4 right-4 ${isAr ? 'text-right' : 'text-left'}`}>
                    <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{cert.organization}</p>
                    <h3 className="text-sm font-bold text-white font-display mt-0.5 line-clamp-1">{cert.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className={`flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 ${
                    isAr ? 'flex-row-reverse' : ''
                  }`}>
                    <span className="flex items-center gap-1">
                      <FiCalendar /> {cert.date}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-primary-500">
                      <FiAward /> {isAr ? 'مستند موثق' : 'ID Verified'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={cert.credentialUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
                    >
                      <FiExternalLink size={14} /> {t('certifications.viewCredential')}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card dark:glass-card-dark p-12 text-center max-w-lg mx-auto border border-dashed border-slate-300 dark:border-slate-800"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
              <FiBookOpen size={28} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 font-display">{t('certifications.emptyTitle')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {t('certifications.emptyDesc')}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary-500 bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
              ⚡ {isAr ? 'الحالة: جاري تحديث الشهادات' : 'Status: Refreshing Credentials'}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
