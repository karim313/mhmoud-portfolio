import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaDatabase, FaChartBar, FaChartLine, FaBrain, FaServer, FaRobot, FaBolt, FaChartPie, FaTable } from 'react-icons/fa'
import { SiPython, SiApacheairflow } from 'react-icons/si'
import { DIPLOMA_COURSES } from '../../data/portfolioData'
import { usePortfolio } from '../../context/PortfolioContext'
import { arabicDiplomaCourses } from '../../data/translations'

const ICON_MAP = {
  SiMicrosoftexcel: FaTable,
  FaDatabase: FaDatabase,
  FaServer: FaServer,
  SiPowerbi: FaBolt,
  SiPython: SiPython,
  SiTableau: FaChartPie,
  FaChartLine: FaChartLine,
  FaBrain: FaBrain,
  SiApacheairflow: SiApacheairflow,
  FaRobot: FaRobot,
}

function CourseCard({ course, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = ICON_MAP[course.icon] || FaChartBar

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className="glass-card dark:glass-card-dark p-6 hover-lift group relative overflow-hidden"
    >
      {/* Background number */}
      <div className="absolute top-3 right-4 text-5xl font-black text-slate-100 dark:text-slate-800 select-none pointer-events-none font-display">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${course.color}20`, border: `1px solid ${course.color}40` }}
      >
        <Icon size={26} style={{ color: course.color }} />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
          style={{ background: course.color }}
        />
        <Icon size={26} style={{ color: course.color }} className="relative z-10" />
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display">{course.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{course.description}</p>

      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: `${course.color}15`, color: course.color, border: `1px solid ${course.color}30` }}
        >
          {course.duration}
        </span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i < 4 ? course.color : `${course.color}30` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function DiplomaSection() {
  const { language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isAr = language === 'ar'
  const displayCourses = DIPLOMA_COURSES.map(course => {
    if (isAr) {
      const arCourse = arabicDiplomaCourses.find(c => c.id === course.id)
      if (arCourse) {
        return {
          ...course,
          name: arCourse.name,
          description: arCourse.description,
          duration: course.duration.replace('weeks', 'أسابيع')
        }
      }
    }
    return course
  })

  return (
    <section id="diploma" className="py-28 relative overflow-hidden bg-slate-50 dark:bg-dark-950">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

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
            {t('curriculum.badge')}
          </span>
          <h2 className="section-title">{t('curriculum.title')}</h2>
          <p className="section-subtitle">
            {t('curriculum.subtitle')}
          </p>
        </motion.div>

        {/* Diploma provider banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className={`glass-card dark:glass-card-dark p-6 mb-12 flex flex-col sm:flex-row items-center gap-6 ${
            isAr ? 'sm:flex-row-reverse' : ''
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30">
            <FaBrain size={28} className="text-white" />
          </div>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-1">
              {t('curriculum.bannerTitle')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {t('curriculum.bannerDesc')}
            </p>
          </div>
          <div className={isAr ? 'mr-auto flex-shrink-0' : 'ml-auto flex-shrink-0'}>
            <span className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/25 text-green-600 dark:text-green-400 text-sm font-semibold">
              ✓ {t('common.completed')}
            </span>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '10', label: t('curriculum.courses') },
            { value: '60+', label: t('curriculum.weeksTotal') },
            { value: '5+', label: t('curriculum.realProjects') },
            { value: '100%', label: t('curriculum.handsOn') },
          ].map(s => (
            <div key={s.label} className="glass-card dark:glass-card-dark p-5 text-center">
              <p className="text-3xl font-black gradient-text font-display">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
