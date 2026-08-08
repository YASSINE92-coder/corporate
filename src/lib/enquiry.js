/** Shared enquiry / contact helpers for CTA deep-links and form prefills. */

// The contact details themselves live in ./contact.js — the single place the
// phone number is defined — and are re-exported so existing imports keep working.
export {
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  telHref,
  whatsappHref,
} from "./contact"

/**
 * Hard caps on enquiry field lengths, enforced as `maxLength` on both forms
 * (ContactForm + QuickEnquiryDialog). EmailJS is the recipient, so oversized
 * payloads cost quota and inbox space rather than database rows — these keep a
 * bot (or a very enthusiastic visitor) from pumping megabytes through the form.
 * 254 is the RFC 5321 upper bound for an email address.
 */
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  school: 150,
  role: 100,
  message: 3000,
}

export const ENQUIRY_SERVICES = [
  { id: "safeguarding", label: "Safeguarding consultancy" },
  { id: "send", label: "SEND & inclusion reviews" },
  { id: "school-improvement", label: "School improvement consultancy" },
  { id: "general", label: "General enquiry" },
]

const SERVICE_IDS = new Set(ENQUIRY_SERVICES.map((service) => service.id))

export function isValidServiceId(value) {
  return typeof value === "string" && SERVICE_IDS.has(value)
}

export function getServiceById(id) {
  return ENQUIRY_SERVICES.find((service) => service.id === id) ?? null
}

export function parseServiceParam(value) {
  if (!value) return "general"
  const normalized = String(value).trim().toLowerCase()
  return isValidServiceId(normalized) ? normalized : "general"
}

/**
 * Build a contact path with optional service query + form hash.
 * Prefer wrapping with `localizePath()` so `lang` stays consistent.
 * @param {string} [service]
 * @param {{ hash?: boolean | string }} [options]
 */
export function contactPath(service, options = {}) {
  const params = new URLSearchParams()
  if (service && service !== "general" && isValidServiceId(service)) {
    params.set("service", service)
  }
  const qs = params.toString()
  const base = qs ? `/contact?${qs}` : "/contact"

  if (options.hash === false) return base
  if (typeof options.hash === "string") {
    const id = options.hash.replace(/^#/, "")
    return id ? `${base}#${id}` : base
  }
  return `${base}#contact-form`
}

/** Scroll to an element once it exists (handles lazy-loaded routes). */
export function scrollToId(id, { behavior = "smooth", block = "start", attempts = 40 } = {}) {
  if (!id || typeof document === "undefined") return () => {}

  let cancelled = false
  let tries = 0

  const tick = () => {
    if (cancelled) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior, block })
      return
    }
    tries += 1
    if (tries < attempts) {
      window.setTimeout(tick, 50)
    }
  }

  tick()
  return () => {
    cancelled = true
  }
}
