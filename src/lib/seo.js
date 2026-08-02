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

export const pages = {
  home: {
    path: "/",
    title: "FM Education Services | Safeguarding Consultant UK, SEND & School Improvement",
    description:
      "UK safeguarding consultant offering SEND support services and school improvement consultancy. Led by Fatiha Maitland — specialist training, audits, and reviews for schools.",
    keywords:
      "safeguarding consultant UK, SEND support services, school improvement consultancy, safeguarding training schools, inclusion reviews",
  },
  about: {
    path: "/about",
    title: "About Fatiha Maitland | Education Consultant & Safeguarding Specialist",
    description:
      "Meet Fatiha Maitland, Director of FM Education Services — 35+ years as a senior inspector and education consultant specialising in safeguarding, SEND, and school improvement across the UK.",
    keywords:
      "Fatiha Maitland, education consultant UK, safeguarding specialist, school improvement advisor, SEND consultant",
  },
  services: {
    path: "/services",
    title: "Safeguarding, SEND Support & School Improvement Consultancy | FM Education",
    description:
      "Bespoke safeguarding consultant UK services, SEND support services, and school improvement consultancy — training, audits, inclusion reviews, and Ofsted preparation.",
    keywords:
      "safeguarding consultant UK, SEND support services, school improvement consultancy, safeguarding auditing, SEND inclusion reviews, Ofsted preparation",
  },
  contact: {
    path: "/contact",
    title: "Contact FM Education Services | Book a Safeguarding or SEND Consultation",
    description:
      "Contact FM Education Services for safeguarding consultancy, SEND support services, or school improvement advice. Same-day responses for UK schools and academies.",
    keywords:
      "contact safeguarding consultant, SEND consultancy enquiry, school improvement advisor UK",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | FM Education Services",
    description:
      "How FM Education Services collects, uses, and protects personal data from website enquiries, cookies, and analytics.",
    keywords: "privacy policy, data protection, FM Education Services",
  },
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
