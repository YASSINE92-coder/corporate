import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  const backgroundColor = useTransform(
    scrollY,
    [0, 60],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.96)'],
    { clamp: true }
  )
  const textColor = useTransform(scrollY, [0, 60], ['#ffffff', '#0f172a'], { clamp: true })
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
        <NavLink to="/" className="text-xl font-semibold tracking-tight" style={{ color: textColor }}>
          Corporate
        </NavLink>

        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: textColor }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="ml-2 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
