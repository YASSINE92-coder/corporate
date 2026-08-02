import { describe, it, expect } from "vitest"
import {
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  AUTHOR_LINKEDIN_URL,
  telHref,
  whatsappHref,
} from "./contact"
import { CONTACT_PHONE as reExportedPhone } from "./enquiry"

describe("phone number", () => {
  it("is stored once in E.164 and re-exported unchanged", () => {
    // Both call paths (tel: and wa.me) must trace back to the same constant, or
    // one of them silently keeps dialling an old number.
    expect(CONTACT_PHONE).toMatch(/^\+\d{7,15}$/)
    expect(reExportedPhone).toBe(CONTACT_PHONE)
  })

  it("derives the wa.me digits from it rather than repeating them", () => {
    expect(CONTACT_WHATSAPP).toBe(CONTACT_PHONE.replace(/\D/g, ""))
    expect(CONTACT_WHATSAPP).not.toContain("+")
  })
})

describe("telHref", () => {
  it("dials the shared number", () => {
    expect(telHref()).toBe(`tel:${CONTACT_PHONE}`)
  })
})

describe("whatsappHref", () => {
  it("targets the shared number, digits only", () => {
    expect(whatsappHref()).toBe(`https://wa.me/${CONTACT_WHATSAPP}`)
  })

  it("url-encodes an optional prefilled message", () => {
    expect(whatsappHref("Hi there & thanks")).toBe(
      `https://wa.me/${CONTACT_WHATSAPP}?text=Hi%20there%20%26%20thanks`
    )
  })

  it("omits the query entirely when there is no message", () => {
    expect(whatsappHref("")).not.toContain("?")
    expect(whatsappHref(undefined)).not.toContain("?")
  })
})

describe("build credit link", () => {
  it("is still the unreplaced placeholder", () => {
    // Fails deliberately once the real profile URL lands, as a nudge to delete
    // this test along with the placeholder.
    expect(AUTHOR_LINKEDIN_URL).toContain("REPLACE-WITH-REAL-PROFILE")
  })
})
