const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let loaded = false

export function isAnalyticsConfigured() {
  return Boolean(GA_ID && !String(GA_ID).startsWith("G-XXXX"))
}

/**
 * Loads Google Analytics (gtag) only after the visitor accepts analytics cookies.
 */
export function enableAnalytics() {
  if (!isAnalyticsConfigured() || loaded || typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID, { anonymize_ip: true })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  loaded = true
}

export function trackPageView(path) {
  if (!loaded || typeof window === "undefined" || !window.gtag) return
  window.gtag("config", GA_ID, { page_path: path })
}
