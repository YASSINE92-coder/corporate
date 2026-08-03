/**
 * Site images — self-hosted locally in /public/images (Vite serves `public/` at `/`).
 *
 * Each entry is the authoritative source (a single JPEG). Responsive AVIF/WebP/
 * JPEG `srcSet`s are layered on at module load from `images.generated.js`, which
 * `npm run images` produces. When that manifest is empty (assets not generated
 * yet) every entry stays exactly as authored, so the site ships the source JPEG
 * and never references a derivative that does not exist.
 *
 * ---------------------------------------------------------------------------
 * PROVENANCE IS MANDATORY. Every entry carries `provenance`:
 *
 *   source              where the file came from (URL, photographer, invoice ref)
 *   licence             the licence actually granted, or "UNVERIFIED"
 *   identifiablePeople  true if any person's face is recognisable
 *   releaseOnFile       true only if permission is held for that person
 *
 * Rules, in order of severity:
 *   1. Never ship a recognisable child. No licence cures this.
 *   2. Never depict a person in connection with safeguarding, abuse, SEND or
 *      any other sensitive subject — most stock licences forbid it outright.
 *   3. `identifiablePeople: true` requires `releaseOnFile: true`.
 *   4. `alt` describes what the photo literally shows. It must never assert
 *      that the people or session depicted are real FM Education clients,
 *      staff or engagements — that is a misleading-advertising exposure
 *      independent of copyright.
 *
 * See docs/image-credits.md for the audit trail and outstanding actions.
 * ---------------------------------------------------------------------------
 */
import { generatedImageSources } from "./images.generated"

/**
 * Unsplash Licence: free, irrevocable, worldwide, commercial use, no attribution
 * required. It grants NO model or property release — which is exactly why every
 * image sourced this way is people-free by rule. Credit is recorded anyway, both
 * because it is courteous and because provenance has to survive staff turnover.
 *
 * `id` is the Unsplash photo id; the page is unsplash.com/photos/<id>.
 * All seven were downloaded on 2026-08-03.
 */
const unsplash = (id, photographer) => ({
  source: `Unsplash photo ${id} by ${photographer} — https://unsplash.com/photos/${id}`,
  licence: "Unsplash Licence — free commercial use, no attribution required",
  identifiablePeople: false,
  releaseOnFile: false,
})

/** Applied to stock files inherited before provenance tracking existed. */
const UNVERIFIED_STOCK = {
  source: "UNVERIFIED — no record of origin in repo history",
  licence: "UNVERIFIED",
  identifiablePeople: false,
  releaseOnFile: false,
}

const sourceImages = {
  homeHero: {
    src: "/images/hero/home-hero.jpg",
    width: 1920,
    height: 1280,
    alt: "Sunlight falling across empty wooden desks in a quiet classroom",
    provenance: unsplash("dFohf_GUZJ0", "2y.kang"),
  },
  aboutHero: {
    src: "/images/about/about-hero.jpg",
    width: 1600,
    height: 1067,
    alt: "An empty meeting room with a long table and a deep teal wall",
    provenance: unsplash("bV5dFLEYecM", "Craig Lovelidge"),
  },
  servicesHero: {
    src: "/images/services/services-hero.jpg",
    width: 1600,
    height: 1067,
    alt: "Hands taking notes in a notebook around a sunlit wooden meeting table",
    provenance: UNVERIFIED_STOCK,
  },
  contactHero: {
    src: "/images/contact/contact-hero.jpg",
    width: 1600,
    height: 1067,
    alt: "A wood-and-glass meeting room in a quiet office",
    provenance: unsplash("B74lBYC3PXI", "Caroline Badran"),
  },
  serviceSafeguarding: {
    src: "/images/services/safeguarding.jpg",
    width: 900,
    height: 600,
    alt: "Rows of empty desk chairs in a bright classroom",
    provenance: unsplash("rkH8YVmjQ4w", "Allen Y"),
  },
  serviceSend: {
    src: "/images/services/send.jpg",
    width: 800,
    height: 565,
    alt: "An apple and alphabet blocks resting on a stack of books",
    provenance: UNVERIFIED_STOCK,
  },
  serviceSchoolImprovement: {
    src: "/images/services/school-improvement.jpg",
    width: 800,
    height: 533,
    alt: "A person browsing between tall library shelves, seen from behind",
    provenance: UNVERIFIED_STOCK,
  },
  contentLeadership: {
    src: "/images/content/leadership.jpg",
    width: 1000,
    height: 563,
    alt: "An empty classroom with desks facing a chalkboard",
    provenance: UNVERIFIED_STOCK,
  },
  contentImpact: {
    src: "/images/content/impact.jpg",
    width: 1000,
    height: 667,
    alt: "An open notebook with a pen and two pencils on a wooden desk",
    provenance: unsplash("n9AaeihA9HI", "Clay Banks"),
  },
  overviewImage: {
    src: "/images/content/overview.jpg",
    width: 1000,
    height: 667,
    alt: "A calm office with white desks, framed prints and a large plant",
    provenance: unsplash("xTmez98cqAM", "Caroline Badran"),
  },
  /**
   * A genuine photograph of Fatiha Maitland, taken and published with her
   * permission — confirmed by the client. It is therefore the one image on the
   * site that may show a recognisable face, and the alt text may name her.
   */
  directorPortrait: {
    src: "/images/about/director.jpg",
    width: 1448,
    height: 1086,
    alt: "Fatiha Maitland, Director of FM Education Services",
    provenance: {
      source: "Supplied by the client — photograph of Fatiha Maitland herself",
      licence: "Used with the subject's permission and validation",
      identifiablePeople: true,
      releaseOnFile: true,
    },
  },
  missionImage: {
    src: "/images/content/mission.jpg",
    width: 900,
    height: 600,
    alt: "Hands writing in a notebook at a meeting table",
    provenance: UNVERIFIED_STOCK,
  },
  visionImage: {
    src: "/images/content/vision.jpg",
    width: 900,
    height: 600,
    alt: "A library aisle lined with shelves of books",
    provenance: unsplash("VL71uk4thVY", "Zoshua Colah"),
  },
}

/** Merge in generated AVIF/WebP/JPEG srcSets by source path (no-op when absent). */
export const siteImages = Object.fromEntries(
  Object.entries(sourceImages).map(([key, image]) => {
    const generated = generatedImageSources[image.src]
    return [key, generated ? { ...image, ...generated } : image]
  })
)
