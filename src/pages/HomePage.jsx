import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import DiplomaSection from '../components/sections/DiplomaSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AnalyticsDashboardShowcase from '../components/sections/AnalyticsDashboardShowcase'
import CertificationsSection from '../components/sections/CertificationsSection'
import ExperienceTimeline from '../components/sections/ExperienceTimeline'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DiplomaSection />
      <ProjectsSection />
      <AnalyticsDashboardShowcase />
      <CertificationsSection />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
