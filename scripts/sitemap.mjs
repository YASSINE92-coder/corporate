/**
 * Generate public/sitemap.xml for the bilingual site: every route in both
 * locales, each entry carrying xhtml:link hreflang alternates (en-GB, ar,
 * x-default). Re-run with `npm run sitemap`. Pure Node — no browser needed.
 */
import { writeFile } from "node:fs/promises"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, "..", "public", "sitemap.xml")

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.fmeducationservices.com").replace(/\/$/, "")

// Locale-agnostic routes with crawl hints. Arabic lives under /ar.
const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
]

const LOCALES = [
  { code: "en", hreflang: "en-GB", prefix: "" },
  { code: "ar", hreflang: "ar", prefix: "/ar" },
]

// Absolute URL for a route; the site root keeps its trailing slash to match
// the canonical emitted by Seo.jsx (absoluteUrl("/") === `${SITE_URL}/`).
function loc(prefix, path) {
  const p = `${prefix}${path === "/" ? "" : path}`
  return p ? `${SITE_URL}${p}` : `${SITE_URL}/`
}

function alternatesFor(path) {
  const links = LOCALES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${loc(l.prefix, path)}" />`
  )
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc("", path)}" />`)
  return links.join("\n")
}

const urls = ROUTES.flatMap(({ path, changefreq, priority }) =>
  LOCALES.map(
    (l) => `  <url>
    <loc>${loc(l.prefix, path)}</loc>
${alternatesFor(path)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`

await writeFile(OUT, xml, "utf8")
console.log(`Wrote ${OUT} (${urls.length} URLs)`)
