import { Helmet } from "react-helmet-async"
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getProfessionalServiceSchema,
} from "../lib/seo"

/**
 * Per-page meta, Open Graph, Twitter cards, and JSON-LD.
 * Place once at the top of each route page.
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
  const canonical = absoluteUrl(path)
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image)
  const jsonLd = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [getProfessionalServiceSchema()]

  return (
    <Helmet>
      <html lang="en-GB" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} — education consultancy`} />
      <meta property="og:locale" content="en_GB" />

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
