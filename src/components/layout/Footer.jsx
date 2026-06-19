import { motion } from 'framer-motion'
import { FiLinkedin, FiGithub, FiMail, FiHeart } from 'react-icons/fi'
import { usePortfolio } from '../../context/PortfolioContext'

const SOCIAL = [
  { icon: FiLinkedin, href: 'https://linkedin.com/in/mahmoud-aboulSaud', label: 'LinkedIn' },
  { icon: FiGithub, href: 'https://github.com/MahmoudAboulSaud', label: 'GitHub' },
  { icon: FiMail, href: 'mailto:mahmoudaboulSaud@gmail.com', label: 'Email' },
]

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { profile } = usePortfolio()
  const scrollTo = (href) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-900 dark:bg-dark-950 border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold font-display">MA</span>
              </div>
              <div>
                <p className="font-bold text-white font-display">{profile.name}</p>
                <p className="text-xs text-primary-400">Data Analyst & BI Specialist</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
              "{profile.quote}"
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 font-display">Get In Touch</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p>📍 {profile.address}</p>
              <p>📱 {profile.phone}</p>
              <p>✉️ mahmoudaboulSaud@gmail.com</p>
            </div>
            <div className="mt-6">
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all duration-300"
              >
                ⬇ Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Mahmoud AboulSaud. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Built with <FiHeart size={12} className="text-red-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
