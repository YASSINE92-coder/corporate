/**
 * Central SEO config for FM Education Services.
 * Set VITE_SITE_URL in .env to your production domain (no trailing slash).
 */
export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL)?.replace(/\/$/, "") ||
  "https://www.fmeducationservices.com"

export const SITE_NAME = "FM Education Services"
/** Branded 1200×630 social card in /public (regenerate with `npm run og`). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

/**
 * Locale-agnostic route paths. Meta copy (title/description/keywords) lives in
 * the translation files (`seo.*` keys) so each locale carries its own — pages
 * consume it via `t("seo.<page>.title")` and only take `path` from here.
 */
export const pages = {
  home: { path: "/" },
  about: { path: "/about" },
  services: { path: "/services" },
  contact: { path: "/contact" },
  privacy: { path: "/privacy" },
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

/** ProfessionalService + Organization JSON-LD */
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description:
      "Specialist safeguarding consultant UK, SEND support services, and school improvement consultancy for schools, academies, and Early Years settings.",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.svg`,
    },
    telephone: "+44-770-426-7745",
    email: "fatiha.maitland1@gmail.com",
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Place", name: "GCC" },
      { "@type": "Place", name: "British Schools Overseas" },
    ],
    serviceType: [
      "Safeguarding consultancy",
      "SEND support services",
      "School improvement consultancy",
      "Inclusion reviews",
      "Safeguarding training and auditing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Education consultancy services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Safeguarding consultancy",
            description:
              "Bespoke safeguarding advice, face-to-face training, and auditing for UK schools and Early Years settings.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEND support services",
            description:
              "One-to-two-day SEND and inclusion reviews that strengthen provision and meet statutory obligations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "School improvement consultancy",
            description:
              "Coaching and mock reviews aligned to UK, UAE, and BSO inspection frameworks.",
          },
        },
      ],
    },
    founder: {
      "@type": "Person",
      name: "Fatiha Maitland",
      jobTitle: "Director",
    },
  }
}

export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function getFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
