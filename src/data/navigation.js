/**
 * Primary site navigation paths (labels come from i18n).
 * Footer includes privacy; navbar does not.
 */
export const NAV_PATHS = [
  { key: "home", to: "/" },
  { key: "about", to: "/about" },
  { key: "services", to: "/services" },
  { key: "contact", to: "/contact#contact-form" },
]

export const FOOTER_EXTRA_PATHS = [{ key: "privacy", to: "/privacy" }]

/**
 * @param {(key: string) => string} t
 * @param {{ includePrivacy?: boolean }} [options]
 */
export function getNavLinks(t, { includePrivacy = false } = {}) {
  const paths = includePrivacy ? [...NAV_PATHS, ...FOOTER_EXTRA_PATHS] : NAV_PATHS
  return paths.map(({ key, to }) => ({
    key,
    to,
    label: t(`nav.${key}`),
  }))
}
