import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useSearchParams } from "react-router-dom"
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  getLocaleConfig,
} from "../i18n/locales"
import { createT } from "../i18n"

const LanguageContext = createContext(null)

const LOCALE_CODES = new Set(LOCALES.map((locale) => locale.code))

/** Fade-out before locale swap; keep in sync with LocaleFade. */
export const LOCALE_FADE_MS = 420

export function isValidLocale(code) {
  return typeof code === "string" && LOCALE_CODES.has(code)
}

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isValidLocale(stored)) return stored
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE
}

function applyDocumentLocale(localeCode) {
  const config = getLocaleConfig(localeCode)
  document.documentElement.lang = config.code === "en" ? "en-GB" : config.code
  document.documentElement.dir = config.dir
}

function persistLocale(localeCode) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, localeCode)
  } catch {
    // ignore
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function LanguageProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryLang = searchParams.get("lang")

  const [locale, setLocaleState] = useState(() =>
    isValidLocale(queryLang) ? queryLang : readStoredLocale()
  )
  const [isLocaleFading, setIsLocaleFading] = useState(false)
  const fadeTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    }
  }, [])

  // Sync from ?lang= (shared links, browser back/forward).
  // If lang is missing/invalid, stamp the active locale onto the URL.
  useEffect(() => {
    if (isValidLocale(queryLang)) {
      if (queryLang !== locale) {
        setLocaleState(queryLang)
        persistLocale(queryLang)
      }
      return
    }

    const next = new URLSearchParams(searchParams)
    if (next.get("lang") === locale) return
    next.set("lang", locale)
    setSearchParams(next, { replace: true })
  }, [queryLang, locale, searchParams, setSearchParams])

  useEffect(() => {
    applyDocumentLocale(locale)
  }, [locale])

  const applyLocale = useCallback(
    (next) => {
      setLocaleState(next)
      persistLocale(next)
      const params = new URLSearchParams(searchParams)
      params.set("lang", next)
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  /**
   * Smooth language change: fade out → swap locale → fade in.
   * Browser back/forward still swaps instantly via the query sync effect.
   */
  const setLocale = useCallback(
    (next) => {
      if (!isValidLocale(next) || next === locale || isLocaleFading) return

      if (prefersReducedMotion()) {
        applyLocale(next)
        return
      }

      setIsLocaleFading(true)
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)

      fadeTimerRef.current = window.setTimeout(() => {
        applyLocale(next)
        // Keep faded for one frame so new copy paints at opacity 0, then fade in.
        requestAnimationFrame(() => {
          fadeTimerRef.current = window.setTimeout(() => {
            setIsLocaleFading(false)
            fadeTimerRef.current = null
          }, 40)
        })
      }, LOCALE_FADE_MS)
    },
    [locale, isLocaleFading, applyLocale]
  )

  /** Append or replace `lang` on an app path (preserves other query params + hash). */
  const localizePath = useCallback(
    (path) => {
      if (!path || typeof path !== "string") return path
      if (
        path.startsWith("#") ||
        path.startsWith("mailto:") ||
        path.startsWith("tel:") ||
        path.startsWith("http")
      ) {
        return path
      }
      if (!path.startsWith("/")) return path

      try {
        const url = new URL(path, "https://local.invalid")
        url.searchParams.set("lang", locale)
        return `${url.pathname}${url.search}${url.hash}`
      } catch {
        return path
      }
    },
    [locale]
  )

  const t = useMemo(() => createT(locale), [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: LOCALES,
      config: getLocaleConfig(locale),
      isRtl: getLocaleConfig(locale).dir === "rtl",
      t,
      localizePath,
      isLocaleFading,
    }),
    [locale, setLocale, t, localizePath, isLocaleFading]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

/** Convenience alias for components that only need translations. */
export function useTranslation() {
  return useLanguage()
}
