import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaDatabase, FaChartBar, FaChartLine, FaBrain, FaServer, FaRobot, FaBolt, FaChartPie, FaTable } from 'react-icons/fa'
import { SiPython, SiPostgresql, SiApacheairflow } from 'react-icons/si'
import { usePortfolio } from '../../context/PortfolioContext'

const ICON_MAP = {
  SiPowerbi: FaBolt,
  SiPython,
  SiTableau: FaChartPie,
  SiMicrosoftexcel: FaTable,
  SiPostgresql,
  SiApacheairflow,
  FaDatabase, FaChartBar, FaChartLine, FaBrain, FaServer, FaRobot,
}

const COMPETENCY_BARS = [
  { label: 'BI & Analytics Projects', value: 95, color: '#6366f1' },
  { label: 'Data Visualization', value: 90, color: '#d946ef' },
  { label: 'SQL & Data Engineering', value: 88, color: '#3b82f6' },
  { label: 'Python & Machine Learning', value: 78, color: '#10b981' },
]

function SkillCard({ skill, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { language } = usePortfolio()
  const Icon = ICON_MAP[skill.icon] || FaChartBar
  
  const isAr = language === 'ar'
  const displayCategory = isAr && skill.category === 'BI Tools' ? 'أدوات ذكاء الأعمال' :
                          isAr && skill.category === 'Database' ? 'قواعد البيانات' :
                          isAr && skill.category === 'Analysis' ? 'تحليل البيانات' :
                          isAr && skill.category === 'Programming' ? 'البرمجة' :
                          isAr && skill.category === 'Architecture' ? 'بنية البيانات' :
                          isAr && skill.category === 'Analytics' ? 'التحليلات' :
                          isAr && skill.category === 'Data Engineering' ? 'هندسة البيانات' :
                          isAr && skill.category === 'AI' ? 'الذكاء الاصطناعي' : skill.category

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass-card dark:glass-card-dark p-5 hover-lift group"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ background: `${skill.color}20`, border: `1px solid ${skill.color}40` }}
        >
          <Icon size={22} style={{ color: skill.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{skill.name}</h3>
            <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : {}}
              transition={{ delay: index * 0.08 + 0.3, duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{displayCategory}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Extracted into its own component so useInView is not called inside map()
function CompetencyBar({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { language } = usePortfolio()

  const isAr = language === 'ar'
  const displayLabel = isAr && item.label === 'BI & Analytics Projects' ? 'مشاريع ذكاء الأعمال والتحليلات' :
                       isAr && item.label === 'Data Visualization' ? 'تصور وتصوير البيانات' :
                       isAr && item.label === 'SQL & Data Engineering' ? 'SQL وهندسة البيانات' :
                       isAr && item.label === 'Python & Machine Learning' ? 'بايثون والتعلم الآلي' : item.label

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{displayLabel}</span>
        <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.value}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
        />
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { profile, skills, language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isAr = language === 'ar'
  const displayAbout = isAr && profile.about.startsWith('Passionate Data Analyst') ? `محلل بيانات وأخصائي ذكاء أعمال شغوف بامتلاك أساس قوي في تحويل مجموعات البيانات المعقدة إلى رؤى قابلة للتنفيذ. أتميز ببناء حلول ذكاء الأعمال المتكاملة، بدءاً من مستودعات البيانات وتحسين استعلامات SQL إلى لوحات معلومات Power BI التفاعلية والتحليلات التنبؤية باستخدام Python.

تشمل خبرتي كامل مستويات التحليل - استخراج البيانات وتحويلها ونمذجتها وتصورها - مما يمكّن المؤسسات من اتخاذ قرارات ذكية قائمة على البيانات. ينصب شغفي على اكتشاف الأنماط المخفية وبناء أدوات تضع ذكاء الأعمال في متناول صناع القرار.

أعمل حالياً على تطوير مهاراتي في هندسة البيانات باستخدام Airflow، والتعلم الآلي، وهندسة الأوامر للذكاء الاصطناعي للبقاء في طليعة صناعة البيانات.` : profile.about

  const paragraphs = displayAbout.split('\n\n')
  const displayAddress = isAr && profile.address === 'El Minya, Egypt' ? 'المنيا، مصر' : profile.address

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-white dark:bg-dark-900">
      {/* Decorations */}
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
            {t('about.badge')}
          </span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {p}
                </p>
              ))}
            </div>

            {/* Info pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: t('about.addressIcon'), text: displayAddress },
                { icon: t('about.phoneIcon'), text: profile.phone },
                { icon: t('about.diplomaIcon'), text: t('about.diplomaName') },
              ].map(item => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            {COMPETENCY_BARS.map((item, i) => (
              <CompetencyBar key={item.label} item={item} index={i} />
            ))}

            {/* Experience badges */}
            <div className="pt-4 grid grid-cols-2 gap-3">
              {[
                { label: '5+', sub: t('about.biProjects') },
                { label: '2+', sub: t('about.yearsLearning') },
                { label: '10+', sub: t('about.skillsMastered') },
                { label: '100%', sub: t('about.dedication') },
              ].map(b => (
                <div key={b.sub} className="glass-card dark:glass-card-dark p-4 text-center">
                  <p className="text-2xl font-black gradient-text font-display">{b.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{b.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold font-display text-center text-slate-900 dark:text-white mb-8"
          >
            {t('about.techTitle')}{' '}
            <span className="gradient-text">{t('about.techTitleAccent')}</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
