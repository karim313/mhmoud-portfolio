import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiArrowDown, FiUser } from 'react-icons/fi'
import { FaDatabase, FaChartBar, FaBolt } from 'react-icons/fa'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { usePortfolio } from '../../context/PortfolioContext'

const STATS = [
  { icon: FaChartBar, value: 5, suffix: '+', label: 'Analytics Projects', color: 'from-primary-500 to-primary-600' },
  { icon: FaBolt, value: 92, suffix: '%', label: 'Power BI Expert', color: 'from-yellow-400 to-orange-500' },
  { icon: FaDatabase, value: 90, suffix: '%', label: 'SQL Specialist', color: 'from-blue-500 to-cyan-500' },
  { icon: FaChartBar, value: 5, suffix: '+', label: 'BI Dashboards', color: 'from-accent-500 to-pink-500' },
]

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const { t } = usePortfolio()
  const Icon = stat.icon

  const getStatLabel = (label) => {
    if (label === 'Analytics Projects') return t('curriculum.realProjects')
    if (label === 'Power BI Expert') return t('hero.powerBi')
    if (label === 'SQL Specialist') return t('hero.sql')
    if (label === 'BI Dashboards') return t('about.biProjects')
    return label
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card dark:glass-card-dark p-5 hover-lift group cursor-default"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-white" size={20} />
      </div>
      <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
        {inView ? (
          <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
        ) : (
          `0${stat.suffix}`
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{getStatLabel(stat.label)}</p>
    </motion.div>
  )
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
}))

export default function HeroSection() {
  const { profile, language, t } = usePortfolio()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  const isAr = language === 'ar'
  const displayName = isAr && profile.name === 'Mahmoud AboulSaud' ? 'محمود أبو السعود' : profile.name
  const displayTitle = isAr && profile.title === 'Data Analyst & BI Specialist' ? 'محلل بيانات وأخصائي ذكاء أعمال' : profile.title
  const displayQuote = isAr && profile.quote === 'Be strong, for life crushes the weak.' ? 'كن قوياً، فالحياة تطحن الضعفاء.' : profile.quote

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-dark-950"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20 pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-500/20 dark:bg-primary-400/10 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              {t('common.available')}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-display font-black text-slate-900 dark:text-white leading-none mb-4"
            >
              {isAr && profile.name === 'Mahmoud AboulSaud' ? (
                <>
                  <span className="block">محمود</span>
                  <span className="gradient-text block">أبو السعود</span>
                </>
              ) : (
                profile.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'gradient-text block' : 'block'}>
                    {word}
                  </span>
                ))
              )}
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4 font-display"
            >
              {displayTitle}
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={`relative mb-8 border-primary-500 italic text-slate-500 dark:text-slate-400 ${
                isAr ? 'pr-5 border-r-2 text-right' : 'pl-5 border-l-2 text-left'
              }`}
            >
              "{displayQuote}"
            </motion.blockquote>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href="/cv.pdf" download className="btn-primary flex items-center gap-2">
                <FiDownload size={16} /> {t('common.downloadCv')}
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary flex items-center gap-2"
              >
                <FiMail size={16} /> {t('common.contactMe')}
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost"
              >
                {t('common.viewProjects')}
              </button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-4 animate-fade-in"
            >
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('common.findMeOn')}</span>
              <div className="flex gap-3">
                {[
                  { icon: FiGithub, href: profile.github || 'https://github.com/MahmoudAboulSaud', label: 'GitHub' },
                  { icon: FiLinkedin, href: profile.linkedin || 'https://linkedin.com/in/mahmoud-aboulSaud', label: 'LinkedIn' },
                  { icon: FiMail, href: `mailto:${profile.email || 'mahmoudaboulSaud@gmail.com'}`, label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl glass-card dark:glass-card-dark flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 via-accent-500 to-primary-600 blur-sm opacity-60"
                style={{ margin: '-8px' }}
              />

              {/* Image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl shadow-primary-500/20"
              >
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Mahmoud AboulSaud - Data Analyst"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 via-indigo-700 to-accent-700 flex items-center justify-center">
                    <FiUser className="text-white/60" size={80} />
                  </div>
                )}
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </motion.div>

              {/* Floating status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 300 }}
                className={`absolute bottom-4 glass-card dark:glass-card-dark px-4 py-2 shadow-xl ${
                  isAr ? 'left-0' : 'right-0'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{t('hero.badge')}</span>
                </div>
              </motion.div>

              {/* Floating Power BI badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className={`absolute -top-4 glass-card dark:glass-card-dark px-3 py-2 shadow-xl animate-float ${
                  isAr ? '-left-4' : '-right-4'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaBolt className="text-yellow-400" size={16} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{t('hero.powerBi')}</span>
                </div>
              </motion.div>

              {/* Floating SQL badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                className="absolute top-1/2 -left-8 glass-card dark:glass-card-dark px-3 py-2 shadow-xl animate-float animate-delay-300"
              >
                <div className="flex items-center gap-2">
                  <FaDatabase className="text-blue-400" size={14} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">SQL Expert</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <FiArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  )
}
