/**
 * Departments and organisations FM Education Services has worked with.
 * Rendered by PartnersSection, beneath the regional cards in TrustedSection.
 *
 * Logos live in /public/logos. Names come from i18n (`partners.orgs.<id>`) so
 * the caption can be localised; `name` here is the English fallback used for
 * `alt` if a key is ever missing.
 *
 * `shape: "circle"` inscribes the mark in a round chip — used for logos whose
 * artwork is a roundel rather than a horizontal lockup.
 */
export const partnerOrganisations = [
  {
    id: "adek",
    name: "Department of Education and Knowledge, Abu Dhabi",
    file: "/logos/adek.svg",
    href: "https://www.adek.gov.ae",
    shape: "wide",
  },
  {
    id: "edt",
    name: "Education Development Trust",
    file: "/logos/edt.svg",
    href: "https://www.edt.org",
    shape: "circle",
  },
  {
    id: "bqa",
    name: "Education & Training Quality Authority, Bahrain",
    file: "/logos/bqa.png",
    href: "https://www.bqa.gov.bh",
    shape: "wide",
  },
  {
    id: "littleDoves",
    name: "Little Doves Nursery & Preschool",
    file: "/logos/little-doves.png",
    href: "https://littledovesnursery.com",
    shape: "circle",
  },
  // Pending client-supplied artwork — see the notes handed back with this branch:
  //  - Sharjah Private Education Authority (SPEA): only a 200x200 expiring
  //    LinkedIn JPEG is reachable, too low-res to ship.
  //  - One further organisation: the supplied Google-cached thumbnail URL is
  //    opaque, so the organisation could not be identified.
  // Both slot straight in here once the files arrive.
]
