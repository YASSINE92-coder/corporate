import { useState } from "react"
import { Link } from "react-router-dom"
import { MessageCircle, X, Mail, Phone } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { CONTACT_EMAIL, CONTACT_PHONE, contactPath } from "../lib/enquiry"
import { useTranslation } from "../context/LanguageContext"

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const { t, localizePath } = useTranslation()

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[min(100vw-2.5rem,20rem)] rounded-3xl border border-border bg-card p-5 text-foreground shadow-2xl theme-surface"
          >
            <p className="mb-1 font-display text-lg font-semibold text-foreground">{t("floating.needSupport")}</p>
            <p className="mb-4 text-sm leading-6 text-muted-foreground">{t("floating.replySameDay")}</p>
            <div className="space-y-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <Mail className="h-4 w-4 text-primary" />
                {t("floating.emailUs")}
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <Phone className="h-4 w-4 text-primary" />
                {t("floating.callNow")}
              </a>
              <Link
                to={localizePath(contactPath())}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {t("floating.requestConsultation")}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={open ? t("floating.closeMenu") : t("floating.openMenu")}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>
    </div>
  )
}
