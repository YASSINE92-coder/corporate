import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { hasAnalyticsConsent } from "../lib/consent"
import { enableAnalytics, trackPageView, isAnalyticsConfigured } from "../lib/analytics"

/**
 * Enables GA after consent and tracks client-side route changes.
 */
export default function AnalyticsListener() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!isAnalyticsConfigured() || !hasAnalyticsConsent()) return
    enableAnalytics()
    trackPageView(`${pathname}${search}`)
  }, [pathname, search])

  return null
}
