import { useMemo } from "react"
import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { Container, Section } from "../components/ui/Container"
import { pages, getBreadcrumbSchema } from "../lib/seo"
import { contactPath } from "../lib/enquiry"
import { CONTACT_EMAIL } from "../lib/contact"
import { richText } from "../i18n/rich"
import { useTranslation, useLanguage } from "../context/LanguageContext"

/** ISO date of the last substantive change; formatted per locale below. */
const LAST_UPDATED_ISO = "2026-07-22"

/**
 * Latin digits in Arabic too, so the date reads consistently with the phone
 * number and email elsewhere on the site rather than switching numeral systems
 * mid-page.
 */
const DATE_LOCALES = { en: "en-GB", ar: "ar-u-nu-latn" }

const linkClass = "font-medium text-primary underline-offset-4 hover:underline"

function Privacy() {
  const meta = pages.privacy
  const { t, localizePath } = useTranslation()
  const { locale } = useLanguage()

  const lastUpdated = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(DATE_LOCALES[locale] ?? DATE_LOCALES.en, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    return formatter.format(new Date(LAST_UPDATED_ISO))
  }, [locale])

  // Reused across three sections, so built once. `dir="ltr"` keeps the address
  // from being reordered by the surrounding RTL paragraph.
  const emailLink = (
    <a className={linkClass} dir="ltr" href={`mailto:${CONTACT_EMAIL}`}>
      {CONTACT_EMAIL}
    </a>
  )

  const collectItems = t("privacy.collect.items")
  const useItems = t("privacy.use.items")

  return (
    <>
      <Seo
        title={t("seo.privacy.title")}
        description={t("seo.privacy.description")}
        path={meta.path}
        keywords={t("seo.privacy.keywords")}
        schema={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <article className="min-h-screen bg-background text-foreground">
        <Section className="pt-28 md:pt-36">
          <Container className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              {t("privacy.eyebrow")}
            </p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="mb-10 text-muted-foreground">
              {t("privacy.lastUpdated", { date: lastUpdated })}
            </p>

            <div className="prose-legal space-y-8 text-base leading-8 text-muted-foreground">
              <section aria-labelledby="privacy-who">
                <h2 id="privacy-who" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.who.title")}
                </h2>
                <p>
                  {richText(t("privacy.who.body"), {
                    brand: <strong className="text-foreground">FM Education Services</strong>,
                    email: emailLink,
                  })}
                </p>
              </section>

              <section aria-labelledby="privacy-collect">
                <h2 id="privacy-collect" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.collect.title")}
                </h2>
                <p>{t("privacy.collect.intro")}</p>
                <ul className="mt-3 list-disc space-y-2 ps-5">
                  {collectItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4">{t("privacy.collect.analytics")}</p>
              </section>

              <section aria-labelledby="privacy-use">
                <h2 id="privacy-use" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.use.title")}
                </h2>
                <ul className="list-disc space-y-2 ps-5">
                  {useItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4">{t("privacy.use.note")}</p>
              </section>

              <section aria-labelledby="privacy-process">
                <h2 id="privacy-process" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.processing.title")}
                </h2>
                <p>
                  {richText(t("privacy.processing.body"), {
                    emailjs: (
                      <a
                        className={linkClass}
                        href="https://www.emailjs.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        EmailJS
                      </a>
                    ),
                    email: emailLink,
                  })}
                </p>
                <p className="mt-4">{t("privacy.processing.note")}</p>
              </section>

              <section aria-labelledby="privacy-cookies">
                <h2 id="privacy-cookies" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.cookies.title")}
                </h2>
                <p>{t("privacy.cookies.body")}</p>
                <p className="mt-4">{t("privacy.cookies.note")}</p>
              </section>

              <section aria-labelledby="privacy-rights">
                <h2 id="privacy-rights" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.rights.title")}
                </h2>
                <p>{t("privacy.rights.body")}</p>
              </section>

              <section aria-labelledby="privacy-contact">
                <h2 id="privacy-contact" className="mb-3 font-display text-2xl font-semibold text-foreground">
                  {t("privacy.contactSection.title")}
                </h2>
                <p>
                  {richText(t("privacy.contactSection.body"), {
                    email: emailLink,
                    form: (
                      <Link to={localizePath(contactPath())} className={linkClass}>
                        {t("privacy.contactSection.formLabel")}
                      </Link>
                    ),
                  })}
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </article>
    </>
  )
}

export default Privacy
