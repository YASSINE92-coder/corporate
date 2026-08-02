/**
 * Generate the branded Open Graph / social-share image (1200×630) to
 * public/og-image.png. Self-contained (no external fonts/assets) so it renders
 * identically anywhere. Re-run with: `npm run og`.
 *
 * Requires Chromium (same as the prerender step): `npx playwright install
 * chromium`, or set PRERENDER_CHROMIUM to an existing binary.
 */
import { chromium } from "playwright"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, "..", "public", "og-image.png")

const html = `<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0">
    <div style="
      width:1200px;height:630px;position:relative;overflow:hidden;box-sizing:border-box;
      padding:72px 80px;color:#fff;font-family:'Source Sans 3',system-ui,-apple-system,Segoe UI,sans-serif;
      background:
        radial-gradient(900px 500px at 82% -10%, rgba(45,158,139,0.28), transparent 60%),
        linear-gradient(135deg,#0b1826 0%,#0f1f30 52%,#123a31 100%);
    ">
      <!-- soft accent ring -->
      <div style="position:absolute;top:-160px;right:-120px;width:520px;height:520px;border-radius:50%;
        background:radial-gradient(closest-side, rgba(47,158,139,0.30), transparent);"></div>

      <!-- brand lockup -->
      <div style="display:flex;align-items:center;gap:20px;">
        <div style="width:76px;height:76px;border-radius:20px;background:#2f9e8b;display:flex;
          align-items:center;justify-content:center;font-weight:800;font-size:34px;color:#06231d;
          box-shadow:0 10px 30px rgba(0,0,0,0.35);">FM</div>
        <div style="line-height:1.18">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:700;letter-spacing:-0.01em;">Fatiha Maitland</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:700;letter-spacing:-0.01em;">FM Education Services</div>
        </div>
      </div>

      <!-- headline -->
      <div style="position:absolute;left:80px;right:80px;top:270px;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:66px;line-height:1.06;font-weight:700;letter-spacing:-0.02em;max-width:900px;">
          Safeguarding, SEND &amp;<br/>School&nbsp;Improvement
        </div>
        <div style="margin-top:26px;font-size:28px;color:#cfe6df;font-weight:500;max-width:860px;">
          Specialist, inspection-led education consultancy — trusted across the UK, UAE, GCC&nbsp;&amp;&nbsp;BSO.
        </div>
      </div>

      <!-- footer row -->
      <div style="position:absolute;left:80px;right:80px;bottom:64px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;gap:12px;">
          ${["United Kingdom", "UAE", "GCC", "BSO"]
            .map(
              (r) =>
                `<span style="padding:9px 18px;border:1px solid rgba(255,255,255,0.22);border-radius:999px;font-size:20px;color:#e8f4f0;background:rgba(255,255,255,0.06);">${r}</span>`
            )
            .join("")}
        </div>
        <div style="font-size:22px;color:#8fd6c7;font-weight:600;letter-spacing:0.02em;">fmeducationservices.com</div>
      </div>
    </div>
  </body>
</html>`

const browser = await chromium.launch({ executablePath: process.env.PRERENDER_CHROMIUM || undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: "networkidle" })
await page.locator("body > div").screenshot({ path: OUT })
await browser.close()
console.log(`Wrote ${OUT}`)
