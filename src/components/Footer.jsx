import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Mail, Phone, ArrowUpRight } from "lucide-react"
import BrandLogo from "./BrandLogo"
import { ThemeToggle } from "./theme-toggle"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "../context/LanguageContext"
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "../lib/enquiry"
import { getNavLinks } from "../data/navigation"

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, localizePath } = useTranslation()
  const links = getNavLinks(t, { includePrivacy: true })

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative border-t border-border bg-footer text-footer-foreground"
      role="contentinfo"
      aria-label={t("footer.landmarkLabel")}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* —— Mobile layout —— */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex flex-col items-center gap-3 text-center">
            <BrandLogo
              className="justify-center text-foreground"
              markClassName="bg-primary text-primary-foreground"
              textClassName="text-foreground text-base"
            />
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <nav aria-label={t("common.navigation")}>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("common.navigation")}
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {links.map((item) => (
                <li key={item.key}>
                  <Link
                    to={localizePath(item.to)}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-card/80 px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("common.getInTouch")}
            </p>
            <div className="grid gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 truncate">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </a>
            </div>

            <Link
              to={localizePath("/contact#contact-form")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {t("common.arrangeConsultation")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mx-auto flex items-center gap-1 rounded-full border border-border bg-card/80 p-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* —— Desktop layout —— */}
        <div className="hidden gap-8 md:grid md:grid-cols-3">
          <div className="space-y-3">
            <BrandLogo
              className="text-foreground"
              markClassName="bg-primary text-primary-foreground"
              textClassName="text-foreground"
            />
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{t("common.navigation")}</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.key}>
                  <Link
                    to={localizePath(item.to)}
                    className="relative inline-block text-muted-foreground transition-colors hover:text-foreground after:absolute after:start-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{t("common.getInTouch")}</h3>
            <p className="text-sm">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground transition hover:text-foreground">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm">
              <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground transition hover:text-foreground">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
            <Link
              to={localizePath("/contact#contact-form")}
              className="inline-block text-sm font-medium text-primary transition hover:underline"
            >
              {t("common.arrangeConsultation")} →
            </Link>

            <div className="flex w-fit items-center gap-1 rounded-full border border-border bg-card/70 p-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-start">
          <p>
            © {year} {t("common.brand")}. {t("common.allRightsReserved")}
          </p>
          <p>
            {t("common.builtBy")}{" "}
            <span className="font-medium text-foreground/80">Yassine Chaanoune</span>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
