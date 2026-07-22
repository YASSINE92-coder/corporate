import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CookieConsent from './components/CookieConsent'
import AnalyticsListener from './components/AnalyticsListener'
import { Toaster } from './components/ui/sonner'
import ScrollToTop from './ScrollToTop'
import LocaleFade from './components/LocaleFade'
import { useTranslation } from './context/LanguageContext'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))

function PageFallback() {
  const { t } = useTranslation()
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={t('common.loading')}
    >
      <span className="sr-only">{t('common.loading')}</span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t('common.skipToContent')}
      </a>
      <Navbar />
      <LocaleFade>
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          <ScrollToTop />
          <AnalyticsListener />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </LocaleFade>
      <FloatingContact />
      <CookieConsent />
      <Toaster />
    </div>
  )
}

export default App
