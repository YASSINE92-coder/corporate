# FM Education Services

Marketing site for **FM Education Services** — the education consultancy of
Fatiha Maitland, specialising in safeguarding, SEND & inclusion, and school
improvement across the UK, UAE, GCC, and BSO.

A fast, bilingual (English / Arabic, with full RTL), fully accessible
single-page app that is **statically prerendered** for search engines and
social sharing.

## Features

- **Bilingual EN/AR with instant switching** — no page reload; locale lives in
  the URL (`/` English, `/ar/*` Arabic) with `<html lang>`/`dir` kept in sync
- **Full RTL support** — logical CSS properties throughout, mirrored icons and
  marquees, Radix `DirectionProvider` for portaled UI, LTR islands for phone
  numbers and digits
- **Contact & quick-enquiry forms** via EmailJS — honeypot anti-spam, field
  length caps, localized validation and toasts
- **Static prerendering** — real HTML for every route (6 pages × 2 locales)
  with per-route canonical, hreflang, Open Graph, and JSON-LD
- **Responsive images** — AVIF/WebP/JPEG srcsets generated at 400–1920 px for
  every photo, LCP preloads per page, width/height reserved (no CLS)
- **Dark / light / system theme** — flash-free via a pre-paint inline script
- **Motion done right** — framer-motion, compositor-only properties, and
  `prefers-reduced-motion` respected in every animated component
- **Consent-gated analytics** — GA4 loads only after cookie accept, IP
  anonymized; declining is a first-class choice
- **Accessibility** — skip links, focus traps, aria labelling, live regions,
  localized alt text in both languages

## Tech stack

- **React 19** + **Vite 6**
- **React Router 7** with path-based locales
- **Tailwind CSS** design system (semantic HSL tokens, dark mode, logical
  properties for RTL)
- **Framer Motion** for motion (CSS keyframes for micro-animation)
- **Radix UI** primitives (dialog, dropdown, tabs, tooltip, accordion)
- **react-helmet-async** for per-route SEO
- **EmailJS** (`@emailjs/browser`) for the contact form — no backend needed
- **Playwright** for the prerender + asset generation steps
- **ESLint 9**, **Prettier**, **Vitest** + Testing Library

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

### Environment variables

Copy `.env.example` to `.env`. All values are optional for local viewing; they
only affect the contact form, analytics, and metadata:

| Variable                   | Purpose                                                 |
| -------------------------- | ------------------------------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service id (dashboard → Email Services)         |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id (dashboard → Email Templates)       |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key (dashboard → Account)                |
| `VITE_SITE_URL`            | Canonical / OG / sitemap base URL (no trailing slash)   |
| `VITE_GA_MEASUREMENT_ID`   | Google Analytics 4 id — loads only after cookie consent |
| `VITE_AUTHOR_LINKEDIN_URL` | Footer build-credit LinkedIn URL (blank = plain text)   |

**Never commit `.env`** — it is git-ignored; only `.env.example` (placeholders)
is tracked. In production (e.g. Vercel), set these as project environment
variables instead.

## Scripts

| Script                            | What it does                                                    |
| --------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                     | Vite dev server                                                 |
| `npm run build`                   | SPA production build to `dist/`                                 |
| `npm run generate`                | **Build + prerender** every route to static HTML (deploy build) |
| `npm run prerender`               | Prerender an existing `dist/`                                   |
| `npm run preview`                 | Serve the built `dist/`                                         |
| `npm run lint`                    | ESLint                                                          |
| `npm run test`                    | Vitest (run once) · `test:watch` for watch mode                 |
| `npm run format` / `format:check` | Prettier write / check                                          |
| `npm run images`                  | Regenerate responsive AVIF/WebP/JPEG variants + manifest        |
| `npm run og`                      | Regenerate the branded social image (`public/og-image.png`)     |
| `npm run sitemap`                 | Regenerate `public/sitemap.xml`                                 |

## Internationalisation

- Locale is derived from the URL: English at `/`, Arabic under `/ar/*`.
- Translations live in `src/i18n/translations/{en,ar}.js`; `src/i18n` resolves
  dotted keys with `{{var}}` interpolation and English fallback.
- Switching language navigates between the locale paths (with a soft fade,
  **no reload**) and sets `<html lang>`/`dir`. Legacy `?lang=ar` links redirect
  to `/ar`.
- Key parity between the two dictionaries is enforced by the test suite —
  adding a key to one locale only fails CI.

## SEO & prerendering

Because search ranking matters here, `npm run generate` renders **real HTML for
every route** (6 pages × 2 locales) instead of shipping an empty JS shell:

- `scripts/prerender.mjs` builds, then snapshots each route in headless Chromium
  (reduced-motion + a scroll pass so all content is painted) to
  `dist/<route>/index.html`.
- Each page carries exactly one authoritative `<title>`, description, canonical,
  `hreflang` alternates (`en-GB`, `ar`, `x-default`), Open Graph/Twitter tags,
  and JSON-LD — managed per-route in `src/components/Seo.jsx`.
- Every page preloads its LCP hero image with the exact AVIF srcset the browser
  will pick.
- `public/sitemap.xml` lists both locales with `hreflang` alternates.

The prerender and image scripts need Chromium: `npx playwright install chromium`
once (also in CI), or set `PRERENDER_CHROMIUM` to an existing browser binary.

## Security

### EmailJS

- All EmailJS identifiers are read from environment variables
  (`src/lib/emailjs.js`) — **nothing is hardcoded** in the source.
- The _public key_ is, by design, visible in the shipped JS bundle (that is how
  EmailJS works client-side). Protect the account in the EmailJS dashboard:
  1. **Domain allowlist** (Account → Security): restrict the key to the
     production origin so it is useless on any other site.
  2. **Rate limiting / quota**: cap sends per hour to bound abuse cost.
  3. **Fixed recipient**: keep the template's _To_ address hardcoded in the
     dashboard — never a `{{variable}}` — so the form can't be repurposed to
     mail arbitrary addresses.
  4. Avoid triple-brace `{{{raw}}}` variables in templates so submitted content
     renders as text, not HTML.
- If a key is ever exposed (committed, pasted, leaked), **rotate it** in the
  dashboard; rotating invalidates the old one everywhere.
- Both forms carry a honeypot field (silent fake-success on trip) and
  `maxLength` caps on every input.

### Headers

`vercel.json` ships a strict `Content-Security-Policy` (self + EmailJS + GA +
Google Fonts only), `X-Frame-Options: DENY`, `nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a minimal
`Permissions-Policy`. The CSP authorizes the inline theme script and the font
stylesheet's `onload` handler **by SHA-256 hash** — if you edit either in
`index.html`, recompute the hashes (any CSP hash generator, or the browser
console will print the expected hash on violation) and update `vercel.json`.

### Privacy

- Google Analytics is injected **only after** the visitor accepts the cookie
  banner; declining stores no analytics cookies. IPs are anonymized.
- The privacy policy page covers enquiries, cookies, and analytics.

## Deployment

Deploy the output of `npm run generate` (the `dist/` folder) to any static
host. The repo includes a `vercel.json` that configures the build command,
clean URLs, the SPA fallback rewrite, and the security headers above — on
Vercel it works out of the box (remember to add the environment variables in
the project settings). On other hosts (Netlify, Cloudflare Pages), replicate
the headers and the `/(.*) → /index.html` fallback in their config format.

## Project structure

```
src/
  components/        UI + section components (ui/ holds the primitives)
  context/           Language + Theme providers
  i18n/              dictionaries, translate(), locale path helpers
  lib/               seo, analytics, animations, images, enquiry helpers
  pages/             Home, About, Services, Contact, Privacy, NotFound
scripts/             prerender, og-image, sitemap, image-optimizer
docs/                image provenance / credits audit trail
```

## Testing

`npm run test` covers the locale path helpers, the i18n resolver
(interpolation, fallback, localized SEO), **dictionary key parity between
English and Arabic**, image alt-text consistency, the enquiry helpers, device
helpers, and a routing + i18n render test for the brand lockup (including the
locale-preserving logo link).
