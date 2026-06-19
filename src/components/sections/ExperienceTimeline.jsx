import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiBookOpen, FiActivity, FiBriefcase, FiTrendingUp } from 'react-icons/fi'
import { EXPERIENCE_TIMELINE } from '../../data/portfolioData'
import { usePortfolio } from '../../context/PortfolioContext'
import { arabicExperienceTimeline } from '../../data/translations'

const ICON_MAP = {
  education: FiBookOpen,
  milestone: FiActivity,
  achievement: FiAward,
  current: FiTrendingUp,
  default: FiBriefcase,
}

function TimelineItem({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { language } = usePortfolio()
  const Icon = ICON_MAP[item.type] || ICON_MAP.default
  const isEven = index % 2 === 0
  const isAr = language === 'ar'

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between md:odd:flex-row-reverse mb-12 md:mb-8 ${
      isAr ? 'text-right' : 'text-left'
    }`}>
      {/* Connector line for mobile */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 -z-10" />

      {/* Date / Year Bubble */}
      <div className={`w-full md:w-[calc(50%-40px)] flex ${
        isAr 
          ? 'justify-end md:justify-start md:group-odd:justify-end md:odd:justify-start md:even:justify-end' 
          : 'justify-start md:justify-end md:group-odd:justify-start md:odd:justify-start md:even:justify-end'
      }`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-600 dark:text-primary-400 text-sm font-bold font-display"
        >
          {item.year}
        </motion.div>
      </div>

      {/* Center Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center -translate-x-1/2 border-4 border-slate-50 dark:border-dark-950 z-10 shadow-lg shadow-primary-500/25"
      >
        <Icon className="text-white" size={16} />
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`w-full md:w-[calc(50%-40px)] ${isAr ? 'pr-16 md:pr-0 pl-0' : 'pl-16 md:pl-0 pr-0'} mt-4 md:mt-0`}
      >
        <div className="glass-card dark:glass-card-dark p-6 hover-lift border border-slate-200/50 dark:border-slate-800/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1">{item.title}</h3>
          <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-3">{item.company}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.skills.map(skill => (
              <span
                key={skill}
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceTimeline() {
  const { language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isAr = language === 'ar'
  const displayTimeline = EXPERIENCE_TIMELINE.map(item => {
    if (isAr) {
      const arItem = arabicExperienceTimeline.find(t => t.id === item.id)
      if (arItem) {
        return {
          ...item,
          title: arItem.title,
          company: arItem.company,
          description: arItem.description,
          year: item.year.replace('Q1', 'الربع الأول').replace('Q2', 'الربع الثاني').replace('Q3', 'الربع الثالث').replace('Q4', 'الربع الرابع')
        }
      }
    }
    return item
  })

  return (
    <section id="experience" className="py-28 relative overflow-hidden bg-slate-50 dark:bg-dark-950">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            {t('experience.badge')}
          </span>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-subtitle">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline center line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-transparent -translate-x-1/2 -z-10" />

          {displayTimeline.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
