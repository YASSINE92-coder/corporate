import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleConfig,
  splitLocalePath,
  withLocale,
} from "../i18n/locales"
import { createT } from "../i18n"

const LanguageContext = createContext(null)

const LOCALE_CODES = new Set(LOCALES.map((locale) => locale.code))

/** Fade-out before locale swap; keep in sync with LocaleFade. */
export const LOCALE_FADE_MS = 420

export function isValidLocale(code) {
  return typeof code === "string" && LOCALE_CODES.has(code)
}

function applyDocumentLocale(localeCode) {
  if (typeof document === "undefined") return
  const config = getLocaleConfig(localeCode)
  document.documentElement.lang = config.code === "en" ? "en-GB" : config.code
  document.documentElement.dir = config.dir
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // The URL is the single source of truth for the active locale.
  const { locale, path: routePath } = useMemo(
    () => splitLocalePath(location.pathname),
    [location.pathname]
  )

  const [isLocaleFading, setIsLocaleFading] = useState(false)
  const fadeTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    }
  }, [])

  // Keep <html lang/dir> in sync with the URL-derived locale.
  useEffect(() => {
    applyDocumentLocale(locale)
  }, [locale])

  // Backward-compatibility: migrate legacy `?lang=ar` links to the new /ar path.
  useEffect(() => {
    const legacy = searchParams.get("lang")
    if (!isValidLocale(legacy) || legacy === locale) return
    const params = new URLSearchParams(searchParams)
    params.delete("lang")
    const qs = params.toString()
    navigate(`${withLocale(routePath, legacy)}${qs ? `?${qs}` : ""}${location.hash}`, {
      replace: true,
    })
  }, [searchParams, locale, routePath, location.hash, navigate])

  const goToLocale = useCallback(
    (next) => {
      const target = `${withLocale(routePath, next)}${location.search}${location.hash}`
      navigate(target)
    },
    [routePath, location.search, location.hash, navigate]
  )

  /**
   * Smooth language change: fade out → navigate to the localized path → fade in.
   * Browser back/forward still swaps instantly (locale follows the URL).
   */
  const setLocale = useCallback(
    (next) => {
      if (!isValidLocale(next) || next === locale || isLocaleFading) return

      if (prefersReducedMotion()) {
        goToLocale(next)
        return
      }

      setIsLocaleFading(true)
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)

      fadeTimerRef.current = window.setTimeout(() => {
        goToLocale(next)
        // Keep faded for one frame so new copy paints at opacity 0, then fade in.
        requestAnimationFrame(() => {
          fadeTimerRef.current = window.setTimeout(() => {
            setIsLocaleFading(false)
            fadeTimerRef.current = null
          }, 40)
        })
      }, LOCALE_FADE_MS)
    },
    [locale, isLocaleFading, goToLocale]
  )

  /** Prefix a locale-agnostic app path with the active locale (preserves query + hash). */
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
        return `${withLocale(url.pathname, locale)}${url.search}${url.hash}`
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
      routePath,
      setLocale,
      locales: LOCALES,
      config: getLocaleConfig(locale),
      isRtl: getLocaleConfig(locale).dir === "rtl",
      t,
      localizePath,
      isLocaleFading,
    }),
    [locale, routePath, setLocale, t, localizePath, isLocaleFading]
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
