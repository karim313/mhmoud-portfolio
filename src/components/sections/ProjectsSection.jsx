import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiEye, FiCode } from 'react-icons/fi'
import { FaDatabase, FaChartBar } from 'react-icons/fa'
import { SiPython } from 'react-icons/si'
import { usePortfolio } from '../../context/PortfolioContext'

const TECH_COLORS = {
  'Power BI': { bg: '#F2C81115', text: '#F2C811', border: '#F2C81130' },
  'SQL': { bg: '#33679115', text: '#336791', border: '#33679130' },
  'Python': { bg: '#3776AB15', text: '#3776AB', border: '#3776AB30' },
  'Tableau': { bg: '#E9762715', text: '#E97627', border: '#E9762730' },
  'DAX': { bg: '#6366f115', text: '#6366f1', border: '#6366f130' },
  'Excel': { bg: '#21734615', text: '#217346', border: '#21734630' },
  'Scikit-learn': { bg: '#d946ef15', text: '#d946ef', border: '#d946ef30' },
  'default': { bg: '#6366f115', text: '#818cf8', border: '#6366f130' },
}

const CATEGORIES = ['All', 'Power BI', 'Analytics', 'Machine Learning', 'Retail']

const PROJECT_EMOJIS = ['📊', '📈', '🍫', '📉', '🏪']
const PROJECT_GRADIENTS = [
  'from-primary-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-emerald-500 to-teal-600',
]

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [hovered, setHovered] = useState(false)
  const { t } = usePortfolio()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card dark:glass-card-dark overflow-hidden hover-lift group"
    >
      {/* Project visual */}
      <div className={`relative h-44 bg-gradient-to-br ${PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length]} overflow-hidden`}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{PROJECT_EMOJIS[index % PROJECT_EMOJIS.length]}</span>
        </div>
        {/* Tech overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-primary-500 transition-all duration-200"
              >
                <FiExternalLink size={18} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
              >
                <FiGithub size={18} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
            {project.category}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-lg bg-primary-500/80 backdrop-blur-sm text-white text-xs font-medium">
              ⭐ {t('admin.newBadge')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-start">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display group-hover:text-primary-500 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map(tech => {
            const style = TECH_COLORS[tech] || TECH_COLORS.default
            return (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
              >
                {tech}
              </span>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
          >
            <FiGithub size={14} /> {t('projects.viewCode')}
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary-500/10 border border-primary-500/25 text-primary-600 dark:text-primary-400 text-xs font-semibold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
          >
            <FiExternalLink size={14} /> {t('projects.viewDemo')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { projects, language, t } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isAr = language === 'ar'

  const displayCategoryLabel = (cat) => {
    if (cat === 'All') return t('projects.all')
    if (cat === 'Analytics') return isAr ? 'التحليلات' : 'Analytics'
    if (cat === 'Machine Learning') return isAr ? 'التعلم الآلي' : 'Machine Learning'
    if (cat === 'Retail') return isAr ? 'التجزئة' : 'Retail'
    return cat
  }

  const getTranslatedProject = (p) => {
    if (!isAr) return p
    let name = p.name
    let description = p.description
    let category = p.category
    
    if (p.name === 'Supply Chain Dashboard') {
      name = 'لوحة تحليلات سلاسل الإمداد'
      description = 'لوحة معلومات تفاعلية متكاملة لمراقبة مؤشرات الأداء الرئيسية لسلاسل الإمداد مثل مستويات المخزون، وأداء الموردين، وكفاءة الخدمات اللوجستية، ومعدلات تلبية الطلبات عبر مراكز توزيع متعددة.'
    } else if (p.name === 'Quantix Sales Analytics') {
      name = 'تحليلات مبيعات كوانتكس'
      description = 'منصة متقدمة لتحليل أداء المبيعات والتنبؤ بها، توفر رؤى في الوقت الفعلي حول اتجاهات الإيرادات، وتوزيع المبيعات الإقليمية، ونمذجة المبيعات التنبؤية.'
    } else if (p.name === 'Chocolate Retail Analytics') {
      name = 'تحليلات تجزئة مبيعات الشوكولاتة'
      description = 'تحليل عميق لمبيعات التجزئة وسلوك العملاء لعلامة تجارية للشوكولاتة، يغطي اتجاهات الموسمية وأداء المنتجات وتجزئة العملاء.'
    } else if (p.name === 'Customer Churn Retention Analysis') {
      name = 'تحليل الاحتفاظ بالعملاء ومعدلات الفقدان'
      description = 'نظام للاحتفاظ بالعملاء والتنبؤ بمعدلات الفقدان باستخدام نماذج التعلم الآلي والتحليل الإحصائي لتحديد العملاء المعرضين للمغادرة وتوصية استراتيجيات احتفاظ مستهدفة.'
    } else if (p.name === 'Retail Analytics Power BI') {
      name = 'تحليلات التجزئة بـ Power BI'
      description = 'حل متكامل لذكاء أعمال قطاع التجزئة يتميز بتحليل متعدد الأبعاد للمبيعات، والمخزون، وسلوك العملاء، والربحية مع تقارير تفاعلية ذكية.'
    }
    
    if (category === 'Analytics') category = 'التحليلات'
    else if (category === 'Machine Learning') category = 'التعلم الآلي'
    else if (category === 'Retail') category = 'التجزئة'

    return { ...p, name, description, category }
  }

  const translatedProjects = projects.map(getTranslatedProject)

  const filtered = activeCategory === 'All'
    ? translatedProjects
    : translatedProjects.filter(p => p.category === activeCategory || (isAr && p.category === displayCategoryLabel(activeCategory)))

  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-white dark:bg-dark-900">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            {t('projects.badge')}
          </span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400 border border-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {displayCategoryLabel(cat)}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <FiCode size={48} className="mx-auto mb-4 opacity-30" />
            <p>{t('projects.noProjects')}</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/MahmoudAboulSaud"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <FiGithub size={16} /> {isAr ? 'عرض الجميع على GitHub' : 'View All on GitHub'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
