import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
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
  const { resolvedTheme } = useTheme()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  const backgroundColor = useTransform(
    scrollY,
    [0, 60],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.96)'],
    { clamp: true }
  )
  const textColor = resolvedTheme === 'dark' ? '#f8fafc' : '#ffffff'
  const scrolledTextColor = resolvedTheme === 'dark' ? '#f8fafc' : '#0f172a'
  const navTextColor = isScrolled ? scrolledTextColor : textColor
  const borderColor = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(15, 23, 42, 0.08)'], { clamp: true })

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-md"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        backgroundColor,
        borderColor: isScrolled ? borderColor : 'rgba(255,255,255,0)',
        boxShadow: isScrolled ? '0 10px 30px rgba(15, 23, 42, 0.12)' : 'none',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <NavLink to="/" className="text-xl font-semibold tracking-tight" style={{ color: navTextColor }}>
          FM Education Services
        </NavLink>

        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: navTextColor }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className={`ml-2 rounded-full border p-1 backdrop-blur-md ${resolvedTheme === 'dark' ? 'border-white/15 bg-white/10' : 'border-slate-900/10 bg-white/20'}`}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
