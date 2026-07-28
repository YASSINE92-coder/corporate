# FM Education Services

Marketing site for **FM Education Services** — the education consultancy of
Fatiha Maitland, specialising in safeguarding, SEND & inclusion, and school
improvement across the UK, UAE, GCC, and BSO.

A fast, bilingual (English / Arabic, with RTL), fully accessible single-page
app that is **statically prerendered** for search engines and social sharing.

## Tech stack

- **React 19** + **Vite 6**
- **React Router 7** with path-based locales (`/` English, `/ar/*` Arabic)
- **Tailwind CSS** design system (semantic HSL tokens, dark mode, reduced-motion aware)
- **Framer Motion** + **GSAP** for motion
- **react-helmet-async** for per-route SEO (canonical, hreflang, Open Graph, JSON-LD)
- **EmailJS** for the contact form
- **Playwright** for the prerender + asset generation steps
- **ESLint 9**, **Prettier**, **Vitest** + Testing Library

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

### Environment

Copy `.env.example` to `.env`. All values are optional for local viewing; they
only affect the contact form and analytics:

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | Contact form delivery (EmailJS) |
| `VITE_SITE_URL` | Canonical / OG / sitemap base URL (no trailing slash) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 — loads only after cookie consent |

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | SPA production build to `dist/` |
| `npm run generate` | **Build + prerender** every route to static HTML (deploy build) |
| `npm run prerender` | Prerender an existing `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (run once) · `test:watch` for watch mode |
| `npm run format` / `format:check` | Prettier write / check |
| `npm run og` | Regenerate the branded social image (`public/og-image.png`) |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |

## Internationalisation

- Locale is derived from the URL: English at `/`, Arabic under `/ar/*`.
- Translations live in `src/i18n/translations/{en,ar}.js`; `src/i18n` resolves
  dotted keys with `{{var}}` interpolation and English fallback.
- Switching language navigates between the locale paths (with a soft fade) and
  sets `<html lang>`/`dir`. Legacy `?lang=ar` links redirect to `/ar`.

## SEO & prerendering

Because search ranking matters here, `npm run generate` renders **real HTML for
every route** (5 pages × 2 locales) instead of shipping an empty JS shell:

- `scripts/prerender.mjs` builds, then snapshots each route in headless Chromium
  (reduced-motion + a scroll pass so all content is painted) to
  `dist/<route>/index.html`.
- Each page carries exactly one authoritative `<title>`, description, canonical,
  `hreflang` alternates (`en-GB`, `ar`, `x-default`), Open Graph/Twitter tags,
  and JSON-LD — managed per-route in `src/components/Seo.jsx`.
- `public/sitemap.xml` lists both locales with `hreflang` alternates.

The prerender and image scripts need Chromium: `npx playwright install chromium`
once (also in CI), or set `PRERENDER_CHROMIUM` to an existing browser binary.

## Deployment

Deploy the output of `npm run generate` (the `dist/` folder) to any static host.
Enable **clean URLs** so `/services` serves `dist/services/index.html` (Netlify,
Vercel, Cloudflare Pages, and GitHub Pages do this by default). Unknown paths
fall back to `index.html`, where the client router takes over.

## Project structure

```
src/
  components/        UI + section components (ui/ holds the primitives)
  context/           Language + Theme providers
  i18n/              dictionaries, translate(), locale path helpers
  lib/               seo, analytics, animations, images, enquiry helpers
  pages/             Home, About, Services, Contact, Privacy
scripts/             prerender, og-image, sitemap generators
```

## Testing

`npm run test` covers the locale path helpers, the i18n resolver
(interpolation, fallback, localized SEO), the enquiry helpers, and a
routing + i18n render test for the brand lockup.
