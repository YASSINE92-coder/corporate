import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../context/LanguageContext'
import { DARK_HERO_SELECTOR } from '../lib/navOverlay'
import { ThemeToggle } from './theme-toggle'
import BrandLogo from './BrandLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { cn } from '../lib/utils'
import { getNavLinks } from '../data/navigation'

/**
 * Is a dark hero currently mounted behind the navbar?
 *
 * Routes are lazy, so the hero can land a tick or two after the pathname changes —
 * hence the MutationObserver rather than a one-shot read on navigation. It starts
 * `false` (the readable default) and the observer fires in the same task as the
 * insertion, before paint, so there is no flicker in practice.
 */
function useHasDarkHero() {
  const [hasDarkHero, setHasDarkHero] = useState(false)

  useEffect(() => {
    const read = () => setHasDarkHero(!!document.querySelector(DARK_HERO_SELECTOR))
    read()

    const main = document.getElementById('main-content')
    if (!main) return undefined

    const observer = new MutationObserver(read)
    observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return hasDarkHero
}

function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hasDarkHero = useHasDarkHero()
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

    const focusablesIn = (root) =>
      root
        ? Array.from(
            root.querySelectorAll(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : []

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

    // The menu locks body scroll, so it behaves modally — keep keyboard focus
    // inside it, close on Escape, and restore focus to the trigger on close.
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = focusablesIn(menuRef.current)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!menuRef.current.contains(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // Capture the current nodes for use in cleanup (refs may have changed by then).
    const menuNode = menuRef.current
    const buttonNode = buttonRef.current

    document.body.style.overflow = 'hidden'
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)

    // Move focus into the menu once it has mounted/animated in.
    const raf = requestAnimationFrame(() => {
      focusablesIn(menuRef.current)[0]?.focus()
    })

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeydown)
      cancelAnimationFrame(raf)
      // Return focus to the toggle unless focus has deliberately moved elsewhere.
      const active = document.activeElement
      if (buttonNode && (!active || active === document.body || menuNode?.contains(active))) {
        buttonNode.focus()
      }
    }
  }, [isMenuOpen])

  // White chrome only where something dark is actually behind it: unscrolled AND
  // sitting over a hero that declared a dark backdrop. Everywhere else — scrolled,
  // or a page that opens on the page background — use the theme foreground, which
  // is what keeps the links readable in the light theme.
  const overHero = hasDarkHero && !isScrolled

  const navTextClass = overHero ? 'text-white' : 'text-foreground'

  /** Focus ring + link states, both measured AA against their own backdrop. */
  const focusRingClass = overHero
    ? 'focus-visible:ring-white focus-visible:ring-offset-transparent'
    : 'focus-visible:ring-ring focus-visible:ring-offset-background'

  const navLinkClass = cn(
    'relative rounded-md px-1 text-sm font-medium transition-colors duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    focusRingClass,
    overHero
      ? // 90% white over the scrimmed hero still clears AA comfortably; going
        // lighter than this is where it starts to fail.
        'text-white hover:text-white/90'
      : 'text-foreground hover:text-primary'
  )

  const chromePillClass = overHero
    ? isDark
      ? 'border-white/15 bg-white/10 text-white'
      : 'border-white/25 bg-white/15 text-white'
    : 'border-border bg-card/90 text-foreground shadow-sm'

  return (
    <motion.nav
      aria-label={t('nav.primary')}
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
          className={cn(
            'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            focusRingClass,
            navTextClass
          )}
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
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              focusRingClass,
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
              className={navLinkClass}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-current"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </>
              )}
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
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-base font-medium transition-colors duration-300',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    )
                  }
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
