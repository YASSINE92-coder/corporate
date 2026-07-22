import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCookieConsent, setCookieConsent } from "../lib/consent"
import { enableAnalytics, isAnalyticsConfigured } from "../lib/analytics"
import { Button } from "./ui/button"
import { useTranslation } from "../context/LanguageContext"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { t, localizePath } = useTranslation()

  useEffect(() => {
    const existing = getCookieConsent()
    if (existing === "accepted") {
      enableAnalytics()
      return
    }
    if (!existing) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    setCookieConsent("accepted")
    enableAnalytics()
    setVisible(false)
  }

  const decline = () => {
    setCookieConsent("declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-2xl theme-surface sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex-1">
          <p id="cookie-consent-title" className="mb-1 font-display text-lg font-semibold text-foreground">
            {t("cookies.title")}
          </p>
          <p id="cookie-consent-desc" className="text-sm leading-6 text-muted-foreground">
            {t("cookies.bodyEssential")}{" "}
            {isAnalyticsConfigured() ? t("cookies.bodyAnalytics") : t("cookies.bodyNoAnalytics")}{" "}
            {t("cookies.seePrivacy")}{" "}
            <Link to={localizePath("/privacy")} className="font-medium text-primary underline-offset-4 hover:underline">
              {t("cookies.privacyPolicy")}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button type="button" variant="ghost" onClick={decline} className="border border-border bg-background">
            {t("cookies.decline")}
          </Button>
          <Button type="button" variant="primary" onClick={accept}>
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  )
}
