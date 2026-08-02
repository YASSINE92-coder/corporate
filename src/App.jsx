import { Fragment, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CookieConsent from './components/CookieConsent'
import AnalyticsListener from './components/AnalyticsListener'
import ScrollProgressBar from './components/ScrollProgressBar'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import ScrollToTop from './ScrollToTop'
import LocaleFade from './components/LocaleFade'
import { fadeInUp } from './lib/animations'
import { useTranslation } from './context/LanguageContext'
import { PREFIXED_LOCALES, splitLocalePath } from './i18n/locales'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))

/** Locale-agnostic routes, rendered once at root and once under each locale prefix. */
const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy', element: <Privacy /> },
]

function localeRoutes(prefix) {
  return ROUTES.map(({ path, element }) => {
    const full = prefix ? `${prefix}${path === '/' ? '' : path}` : path
    return <Route key={full} path={full} element={element} />
  })
}

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

function AnimatedRoutes() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  const pageMotionProps = prefersReducedMotion
    ? { initial: false, animate: undefined, exit: undefined }
    : { initial: 'hidden', animate: 'visible', exit: 'hidden', variants: fadeInUp }

  // Key on the locale-agnostic path so switching language on the same page
  // is handled by LocaleFade, not a full page transition.
  const { path: routePath } = splitLocalePath(location.pathname)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={routePath} {...pageMotionProps}>
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            {localeRoutes('')}
            {PREFIXED_LOCALES.map((code) => (
              <Fragment key={code}>{localeRoutes(`/${code}`)}</Fragment>
            ))}
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const { t } = useTranslation()

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {t('common.skipToContent')}
        </a>
        <ScrollProgressBar />
        <Navbar />
        <LocaleFade>
          <main id="main-content" className="min-h-screen" tabIndex={-1}>
            <ScrollToTop />
            <AnalyticsListener />
            <AnimatedRoutes />
          </main>
          <Footer />
        </LocaleFade>
        <FloatingContact />
        <CookieConsent />
        <Toaster />
      </div>
    </TooltipProvider>
  )
}

export default App
