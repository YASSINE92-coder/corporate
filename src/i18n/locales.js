export const LOCALES = [
  { code: "en", label: "EN", name: "English", flag: "gb", dir: "ltr" },
  { code: "ar", label: "AR", name: "العربية", flag: "ma", dir: "rtl" },
]

export const DEFAULT_LOCALE = "en"
export const LOCALE_STORAGE_KEY = "fm-locale"

/** Non-default locale codes get a URL prefix (e.g. "ar" → "/ar"). */
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale.code !== DEFAULT_LOCALE).map(
  (locale) => locale.code
)

export function getLocaleConfig(code) {
  return LOCALES.find((locale) => locale.code === code) ?? LOCALES[0]
}

/** The path prefix for a locale — "" for the default, "/<code>" otherwise. */
export function localePrefix(code) {
  return PREFIXED_LOCALES.includes(code) ? `/${code}` : ""
}

/**
 * Split a full pathname into its locale and the locale-agnostic route path.
 * "/ar/services" → { locale: "ar", path: "/services" }
 * "/about"       → { locale: "en", path: "/about" }
 */
export function splitLocalePath(pathname = "/") {
  const clean = pathname.replace(/\/+$/, "") || "/"
  const segments = clean.split("/").filter(Boolean)
  const first = segments[0]
  if (PREFIXED_LOCALES.includes(first)) {
    const rest = `/${segments.slice(1).join("/")}`
    return { locale: first, path: rest === "/" ? "/" : rest }
  }
  return { locale: DEFAULT_LOCALE, path: clean }
}

/**
 * Prefix a locale-agnostic app path with the given locale.
 * ("/services", "ar") → "/ar/services" · ("/", "ar") → "/ar" · ("/about", "en") → "/about"
 */
export function withLocale(path = "/", code = DEFAULT_LOCALE) {
  const prefix = localePrefix(code)
  if (!prefix) return path || "/"
  if (path === "/" || path === "") return prefix
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`
}
