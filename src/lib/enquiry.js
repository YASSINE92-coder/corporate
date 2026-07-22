/** Shared enquiry / contact helpers for CTA deep-links and form prefills. */

export const CONTACT_PHONE = "+447704267745"
export const CONTACT_PHONE_DISPLAY = "+44 (0) 770 426 7745"
export const CONTACT_EMAIL = "fatiha.maitland1@gmail.com"

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
