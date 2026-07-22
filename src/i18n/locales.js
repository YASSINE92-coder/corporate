export const LOCALES = [
  { code: "en", label: "EN", name: "English", flag: "gb", dir: "ltr" },
  { code: "fr", label: "FR", name: "Français", flag: "fr", dir: "ltr" },
  { code: "ar", label: "AR", name: "العربية", flag: "ma", dir: "rtl" },
]

export const DEFAULT_LOCALE = "en"
export const LOCALE_STORAGE_KEY = "fm-locale"

export function getLocaleConfig(code) {
  return LOCALES.find((locale) => locale.code === code) ?? LOCALES[0]
}
