import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const { theme } = useTheme()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const isDark = theme === 'dark'
  const textColor = isDark ? '#f8fafc' : '#ffffff'
  const scrolledTextColor = isDark ? '#f8fafc' : '#0f172a'
  const mobileTextColor = isDark ? '#f8fafc' : '#0f172a'
  const navTextColor = isScrolled ? scrolledTextColor : textColor

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'border-white/10 bg-slate-950/95 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
            : 'border-slate-900/10 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.12)]'
          : 'border-transparent bg-transparent'
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <NavLink to="/" className="font-display text-xl font-semibold tracking-tight" style={{ color: navTextColor }}>
          FM Education Services
        </NavLink>

        <div className="flex items-center gap-3 md:hidden">
          <div className={`rounded-full border p-1 backdrop-blur-md ${isDark ? 'border-white/15 bg-white/10' : 'border-slate-900/10 bg-white/20'}`}>
            <ThemeToggle />
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${isDark ? 'border-white/15 bg-white/10 text-slate-100' : 'border-slate-900/10 bg-white/20 text-slate-900'}`}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} style={{ backgroundColor: navTextColor }} />
              <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundColor: navTextColor }} />
              <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} style={{ backgroundColor: navTextColor }} />
            </span>
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`
              }
              style={{ color: navTextColor }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className={`ml-2 rounded-full border p-1 backdrop-blur-md ${isDark ? 'border-white/15 bg-white/10' : 'border-slate-900/10 bg-white/20'}`}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`mx-4 mt-2 rounded-2xl border px-4 py-4 shadow-lg backdrop-blur-md md:hidden ${isDark ? 'border-white/10 bg-slate-950/95' : 'border-slate-900/10 bg-white/95'}`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium transition-colors duration-300"
                  style={{ color: mobileTextColor }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
