import en from "./translations/en"
import fr from "./translations/fr"
import ar from "./translations/ar"
import { DEFAULT_LOCALE } from "./locales"

export const dictionaries = { en, fr, ar }

/**
 * Resolve a dotted key (e.g. "nav.home") or return a nested value.
 * Falls back to English, then the key itself.
 */
export function translate(locale, key, vars) {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
  const fallback = dictionaries[DEFAULT_LOCALE]

  let value = getByPath(dict, key)
  if (value === undefined) value = getByPath(fallback, key)
  if (value === undefined) return key

  if (typeof value === "string" && vars) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, name) =>
      vars[name] != null ? String(vars[name]) : `{{${name}}}`
    )
  }

  return value
}

function getByPath(obj, path) {
  if (!obj || !path) return undefined
  return path.split(".").reduce((acc, part) => {
    if (acc == null) return undefined
    return acc[part]
  }, obj)
}

export function createT(locale) {
  return (key, vars) => translate(locale, key, vars)
}
