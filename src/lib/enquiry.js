/** Shared enquiry / contact helpers for CTA deep-links and form prefills. */

export const CONTACT_PHONE = "+447704267745"
export const CONTACT_PHONE_DISPLAY = "+44 (0) 770 426 7745"
export const CONTACT_EMAIL = "fatiha.maitland1@gmail.com"

export const ENQUIRY_SERVICES = [
  {
    id: "safeguarding",
    label: "Safeguarding consultancy",
    shortLabel: "Safeguarding",
  },
  {
    id: "send",
    label: "SEND & inclusion reviews",
    shortLabel: "SEND support",
  },
  {
    id: "school-improvement",
    label: "School improvement consultancy",
    shortLabel: "School improvement",
  },
  {
    id: "general",
    label: "General enquiry",
    shortLabel: "General",
  },
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

/** Build a contact path with optional service query param. */
export function contactPath(service) {
  if (!service || service === "general") return "/contact"
  if (!isValidServiceId(service)) return "/contact"
  return `/contact?service=${encodeURIComponent(service)}`
}
