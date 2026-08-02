/**
 * Site images — self-hosted locally in /public/images (Vite serves `public/` at `/`).
 *
 * Each entry is the authoritative source (a single JPEG). Responsive AVIF/WebP/
 * JPEG `srcSet`s are layered on at module load from `images.generated.js`, which
 * `npm run images` produces. When that manifest is empty (assets not generated
 * yet) every entry stays exactly as authored, so the site ships the source JPEG
 * and never references a derivative that does not exist.
 */
import { generatedImageSources } from "./images.generated"

const sourceImages = {
  homeHero: {
    src: "/images/hero/home-hero.jpg",
    width: 1920,
    height: 1080,
    alt: "Safeguarding training and school leadership support for UK education settings",
  },
  aboutHero: {
    src: "/images/about/about-hero.jpg",
    width: 1600,
    height: 900,
    alt: "Education consultants collaborating on school improvement planning",
  },
  servicesHero: {
    src: "/images/services/services-hero.jpg",
    width: 1600,
    height: 900,
    alt: "School leaders discussing safeguarding and SEND support services",
  },
  contactHero: {
    src: "/images/contact/contact-hero.jpg",
    width: 1600,
    height: 900,
    alt: "School leaders contacting an education consultancy for safeguarding support",
  },
  serviceSafeguarding: {
    src: "/images/services/safeguarding.jpg",
    width: 900,
    height: 700,
    alt: "Safeguarding training for schools in the UK",
  },
  serviceSend: {
    src: "/images/services/send.jpg",
    width: 800,
    height: 600,
    alt: "SEND support services and inclusive learning in a UK classroom",
  },
  serviceSchoolImprovement: {
    src: "/images/services/school-improvement.jpg",
    width: 800,
    height: 600,
    alt: "School improvement consultancy supporting teachers and leaders",
  },
  contentLeadership: {
    src: "/images/content/leadership.jpg",
    width: 1000,
    height: 800,
    alt: "School improvement consultancy session supporting school leaders in the UK",
  },
  contentImpact: {
    src: "/images/content/impact.jpg",
    width: 1000,
    height: 800,
    alt: "SEND support services and inclusive classroom practice in a UK school",
  },
  overviewImage: {
    src: "/images/content/overview.jpg",
    width: 1000,
    height: 750,
    alt: "School leaders collaborating on safeguarding and school improvement planning",
  },
  // TODO: replace file with Fatiha's real headshot; alt is only accurate once that's done
  directorPortrait: {
    src: "/images/about/director.jpg",
    width: 1448,
    height: 1086,
    alt: "Fatiha Maitland, Director of FM Education Services",
  },
  missionImage: {
    src: "/images/content/mission.jpg",
    width: 900,
    height: 600,
    alt: "Education specialists reviewing SEND and inclusion outcomes",
  },
  visionImage: {
    src: "/images/content/vision.jpg",
    width: 900,
    height: 600,
    alt: "A supportive, inclusive learning environment in a school",
  },
}

/** Merge in generated AVIF/WebP/JPEG srcSets by source path (no-op when absent). */
export const siteImages = Object.fromEntries(
  Object.entries(sourceImages).map(([key, image]) => {
    const generated = generatedImageSources[image.src]
    return [key, generated ? { ...image, ...generated } : image]
  })
)
