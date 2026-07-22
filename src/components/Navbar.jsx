import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../context/LanguageContext'
import { ThemeToggle } from './theme-toggle'
import BrandLogo from './BrandLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { cn } from '../lib/utils'
import { getNavLinks } from '../data/navigation'

function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const { isDark } = useTheme()
  const { t, localizePath } = useTranslation()
  const navLinks = getNavLinks(t)

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

  // Over hero: always light text. Scrolled: follow theme foreground.
  const overHero = !isScrolled
  const navTextClass = overHero
    ? 'text-white'
    : 'text-foreground'

  const chromePillClass = overHero
    ? isDark
      ? 'border-white/15 bg-white/10 text-white'
      : 'border-white/25 bg-white/15 text-white'
    : 'border-border bg-card/90 text-foreground shadow-sm'

  return (
    <motion.nav
      aria-label="Primary"
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300',
        isScrolled
          ? 'border-border bg-background/95 shadow-[0_10px_30px_hsl(var(--foreground)/0.08)]'
          : 'border-transparent bg-transparent'
      )}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <BrandLogo
          className={navTextClass}
          markClassName={overHero ? 'bg-white text-slate-900 shadow-sm' : undefined}
          textClassName="hidden sm:inline"
        />

        <div className="flex items-center gap-3 md:hidden">
          <div className={cn('flex items-center gap-1 rounded-full border p-1 backdrop-blur-md', chromePillClass)}>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors backdrop-blur-md',
              chromePillClass
            )}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  isMenuOpen && 'translate-y-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  isMenuOpen && '-translate-y-2 -rotate-45'
                )}
              />
            </span>
          </button>
        </div>

        <div className="ms-auto hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.key}
              to={localizePath(link.to)}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors duration-300',
                  navTextClass,
                  isActive && 'underline underline-offset-8 decoration-2'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className={cn('ms-2 flex items-center gap-1 rounded-full border p-1 backdrop-blur-md', chromePillClass)}>
            <LanguageSwitcher />
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
            className="mx-4 mt-2 rounded-2xl border border-border bg-card/95 px-4 py-4 text-foreground shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.key}
                  to={localizePath(link.to)}
                  end={link.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors duration-300 hover:bg-muted"
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
