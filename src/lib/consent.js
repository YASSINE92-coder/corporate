const CONSENT_KEY = "fm-cookie-consent"

export function getCookieConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function hasAnalyticsConsent() {
  return getCookieConsent() === "accepted"
}
