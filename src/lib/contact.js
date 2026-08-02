/**
 * Single source of truth for the numbers, addresses and outbound links the site
 * dials, mails or credits. Everything that builds a `tel:`, `wa.me` or profile
 * URL imports from here so the digits only ever live in one place.
 *
 * `src/lib/enquiry.js` re-exports the contact constants for the modules that
 * already import them from there.
 */

/** E.164, no spaces — the only form `tel:` and `wa.me` should ever see. */
export const CONTACT_PHONE = "+447704267745"

/** Human-readable form for on-screen labels. */
export const CONTACT_PHONE_DISPLAY = "+44 (0) 770 426 7745"

export const CONTACT_EMAIL = "fatiha.maitland1@gmail.com"

/** wa.me wants the digits only — no "+", no separators. */
export const CONTACT_WHATSAPP = CONTACT_PHONE.replace(/\D/g, "")

export const telHref = () => `tel:${CONTACT_PHONE}`

/**
 * WhatsApp deep link. Opens the chat in the app when installed and in
 * web.whatsapp.com otherwise, so it works on desktop where `tel:` does not.
 */
export const whatsappHref = (message) =>
  `https://wa.me/${CONTACT_WHATSAPP}${message ? `?text=${encodeURIComponent(message)}` : ""}`

/** Build credit in the footer. */
export const AUTHOR_NAME = "Yassine Chaanoune"

/**
 * PLACEHOLDER — replace with the real LinkedIn profile URL.
 * Not present anywhere in the codebase or client hand-off notes at time of
 * writing; swap the slug below and nothing else needs to change.
 */
export const AUTHOR_LINKEDIN_URL = "https://www.linkedin.com/in/REPLACE-WITH-REAL-PROFILE"
