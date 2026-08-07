import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { Container, Section } from "../components/ui/Container"
import { Button } from "../components/ui/button"
import { useTranslation } from "../context/LanguageContext"

/**
 * Catch-all 404 page rendered by the `*` route for any unknown path (in either
 * locale). Marked noindex so search engines don't index the fallback.
 */
function NotFound() {
  const { t, localizePath } = useTranslation()

  return (
    <>
      <Seo title={t("notFound.title")} description={t("notFound.body")} path="/404" noindex />
      <Section>
        <Container className="flex min-h-[45vh] max-w-2xl flex-col items-center justify-center text-center">
          <p className="mb-3 font-display text-6xl font-semibold text-primary">404</p>
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {t("notFound.heading")}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">{t("notFound.body")}</p>
          <Button as={Link} to={localizePath("/")}>
            {t("notFound.cta")}
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default NotFound
