import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(undefined)
export const THEME_STORAGE_KEY = 'corporate-theme'

/** The three choices the theme menu offers. `system` follows the OS setting. */
export const THEME_PREFERENCES = ['light', 'dark', 'system']

const THEME_COLORS = {
  light: '#f4f7f9',
  dark: '#0a1219',
}

const DARK_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function isPreference(value) {
  return THEME_PREFERENCES.includes(value)
}

/**
 * What gets stored is the *preference*, not the painted theme — so "system" keeps
 * tracking the OS across reloads instead of freezing at whatever it resolved to on
 * the first visit. Values written before `system` existed were plain
 * 'light'/'dark', and still read correctly as explicit choices.
 *
 * Keep this in sync with the boot script in index.html, which paints the same
 * decision before React loads so there is no flash of the wrong theme.
 */
function getStoredPreference() {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isPreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

function applyThemeToDocument(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', THEME_COLORS[theme] ?? THEME_COLORS.light)
  }
}

export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(getStoredPreference)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  // The theme actually painted: the explicit choice, or the OS in system mode.
  const theme = preference === 'system' ? systemTheme : preference

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference)
    } catch {
      // ignore (private mode / storage disabled)
    }
  }, [preference])

  // Track the OS unconditionally. `systemTheme` is only *read* in system mode, so
  // switching back to system later reflects the current OS setting immediately.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia(DARK_QUERY)
    const handleSystemThemeChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener?.('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener?.('change', handleSystemThemeChange)
  }, [])

  const setPreference = useCallback((next) => {
    if (isPreference(next)) setPreferenceState(next)
  }, [])

  /** Explicitly pick light or dark. Use setPreference to opt back into 'system'. */
  const setTheme = useCallback((nextTheme) => {
    if (nextTheme === 'light' || nextTheme === 'dark') {
      setPreferenceState(nextTheme)
    }
  }, [])

  /** Flip to the opposite of what is on screen now, as an explicit choice. */
  const toggleTheme = useCallback(() => {
    setPreferenceState((current) => {
      const resolved = current === 'system' ? getSystemTheme() : current
      return resolved === 'dark' ? 'light' : 'dark'
    })
  }, [])

  const value = useMemo(
    () => ({
      theme,
      preference,
      systemTheme,
      setPreference,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, preference, systemTheme, setPreference, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
