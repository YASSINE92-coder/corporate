/**
 * Static prerender step (run after `vite build`).
 *
 * Serves the built SPA from ./dist and, for every locale route, snapshots the
 * fully-rendered DOM to a static HTML file. Crawlers (and users on a slow first
 * paint) get real content and correct per-page <head> (title, canonical,
 * hreflang, Open Graph, JSON-LD) instead of an empty JS shell.
 *
 * We render in a real browser (Chromium via Playwright) rather than Node SSR so
 * the app runs exactly as shipped — no server-safety refactor, no hydration
 * mismatch class of bugs. Reduced-motion is emulated so entrance animations and
 * the typewriter hero resolve to their final state immediately, and we scroll
 * each page so `whileInView` sections are painted before the snapshot.
 *
 * Requires Chromium: run `npx playwright install chromium` once (CI too).
 */
import { chromium } from "playwright"
import { createServer } from "node:http"
import { readFile, writeFile, mkdir, stat } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, extname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, "..", "dist")
const PORT = Number(process.env.PRERENDER_PORT) || 4183

/** Locale-agnostic routes; the Arabic set is derived with the /ar prefix. */
const BASE_ROUTES = ["/", "/about", "/services", "/contact", "/privacy"]
const ROUTES = [...BASE_ROUTES, ...BASE_ROUTES.map((r) => (r === "/" ? "/ar" : `/ar${r}`))]

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

/** Minimal static server. Every navigation route boots from the PRISTINE built
 * shell (captured once, in memory) so a page we just prerendered can never
 * pollute the next snapshot's <head>. Only real asset files are served off disk. */
async function startServer() {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error(`dist/index.html not found — run \`vite build\` first (looked in ${DIST})`)
  }
  const template = await readFile(join(DIST, "index.html"))

  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0])
      // Asset request (has an extension): serve the real file if it exists.
      if (extname(urlPath)) {
        const filePath = join(DIST, urlPath)
        const info = await stat(filePath).catch(() => null)
        if (info?.isFile()) {
          res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" })
          res.end(await readFile(filePath))
          return
        }
        res.writeHead(404)
        res.end("Not found")
        return
      }
      // Navigation route: always the clean shell.
      res.writeHead(200, { "content-type": MIME[".html"] })
      res.end(template)
    } catch (err) {
      res.writeHead(500)
      res.end(String(err))
    }
  })

  return new Promise((res) => server.listen(PORT, () => res(server)))
}

/** Scroll through the page so framer-motion `whileInView` sections paint (once). */
async function revealAll(page) {
  await page.evaluate(
    () =>
      new Promise((done) => {
        let y = 0
        const step = () => {
          window.scrollTo(0, y)
          y += Math.round(window.innerHeight * 0.8)
          if (y < document.body.scrollHeight) {
            setTimeout(step, 90)
          } else {
            window.scrollTo(0, document.body.scrollHeight)
            setTimeout(() => {
              window.scrollTo(0, 0)
              done()
            }, 180)
          }
        }
        step()
      })
  )
  await page.waitForTimeout(350)
}

function outFileFor(route) {
  if (route === "/") return join(DIST, "index.html")
  return join(DIST, route.replace(/^\//, ""), "index.html")
}

async function run() {
  const server = await startServer()
  // Honor an explicit browser path (e.g. a CI image that preinstalls Chromium);
  // otherwise use the one Playwright manages via `npx playwright install chromium`.
  const executablePath = process.env.PRERENDER_CHROMIUM || undefined
  const browser = await chromium.launch({ executablePath })
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    reducedMotion: "reduce",
    colorScheme: "light",
  })

  // The snapshot only needs the rendered DOM, so block external origins
  // (Google Fonts, Unsplash, analytics). This keeps prerender fast and
  // deterministic instead of waiting on third-party network settle.
  await context.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname
    if (host === "localhost" || host === "127.0.0.1") return route.continue()
    return route.abort()
  })

  let ok = 0
  try {
    for (const route of ROUTES) {
      const page = await context.newPage()
      const url = `http://localhost:${PORT}${route}`
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 })
      // Wait for the app to mount and react-helmet to apply the per-route <head>.
      await page.waitForSelector("#root > *", { timeout: 15000 })
      await page.waitForFunction(() => !!document.querySelector('link[rel="canonical"]'), {
        timeout: 15000,
      })
      await revealAll(page)

      let html = await page.content()
      // Ensure a doctype (page.content() includes it, but be defensive).
      if (!/^\s*<!doctype/i.test(html)) html = `<!doctype html>\n${html}`

      const out = outFileFor(route)
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, html, "utf8")
      const lang = await page.getAttribute("html", "lang")
      console.log(`  ✓ ${route.padEnd(16)} → ${out.replace(DIST + "/", "dist/")}  (lang=${lang})`)
      ok += 1
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log(`\nPrerendered ${ok}/${ROUTES.length} routes.`)
  if (ok !== ROUTES.length) process.exit(1)
}

run().catch((err) => {
  console.error("Prerender failed:", err)
  process.exit(1)
})
