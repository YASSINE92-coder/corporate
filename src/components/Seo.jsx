import { Helmet } from "react-helmet-async"
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getProfessionalServiceSchema,
} from "../lib/seo"
import { DEFAULT_LOCALE, LOCALES, withLocale } from "../i18n/locales"
import { useLanguage } from "../context/LanguageContext"

/** hreflang value + OpenGraph locale tag for each supported locale. */
const HREFLANG = { en: "en-GB", ar: "ar" }
const OG_LOCALE = { en: "en_GB", ar: "ar_AE" }

/**
 * Per-page meta, Open Graph, Twitter cards, hreflang alternates, and JSON-LD.
 * `path` is the locale-agnostic route (e.g. "/about"); canonical + alternates
 * are derived per locale. Place once at the top of each route page.
 */
export default function Seo({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  schema,
  noindex = false,
}) {
  const { locale } = useLanguage()
  const canonical = absoluteUrl(withLocale(path, locale))
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image)
  const jsonLd = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [getProfessionalServiceSchema()]

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates for the bilingual site */}
      {LOCALES.map((l) => (
        <link
          key={l.code}
          rel="alternate"
          hrefLang={HREFLANG[l.code] ?? l.code}
          href={absoluteUrl(withLocale(path, l.code))}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absoluteUrl(withLocale(path, DEFAULT_LOCALE))} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} — education consultancy`} />
      <meta property="og:locale" content={OG_LOCALE[locale] ?? OG_LOCALE.en} />
      {LOCALES.filter((l) => l.code !== locale).map((l) => (
        <meta key={l.code} property="og:locale:alternate" content={OG_LOCALE[l.code] ?? l.code} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Base URL hint for relative assets */}
      <link rel="home" href={SITE_URL} />

      {jsonLd.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
