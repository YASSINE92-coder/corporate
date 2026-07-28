import { describe, it, expect } from "vitest"
import { parseServiceParam, contactPath, isValidServiceId } from "./enquiry"

describe("isValidServiceId", () => {
  it("accepts known ids and rejects others", () => {
    expect(isValidServiceId("safeguarding")).toBe(true)
    expect(isValidServiceId("send")).toBe(true)
    expect(isValidServiceId("nope")).toBe(false)
    expect(isValidServiceId(undefined)).toBe(false)
  })
})

describe("parseServiceParam", () => {
  it("normalizes case and whitespace", () => {
    expect(parseServiceParam("SEND")).toBe("send")
    expect(parseServiceParam("  safeguarding ")).toBe("safeguarding")
  })
  it("defaults unknown or empty values to general", () => {
    expect(parseServiceParam("bogus")).toBe("general")
    expect(parseServiceParam("")).toBe("general")
    expect(parseServiceParam(undefined)).toBe("general")
  })
})

describe("contactPath", () => {
  it("defaults to the form anchor", () => {
    expect(contactPath()).toBe("/contact#contact-form")
  })
  it("adds a service query for real services", () => {
    expect(contactPath("send")).toBe("/contact?service=send#contact-form")
  })
  it("omits the query for the general service", () => {
    expect(contactPath("general")).toBe("/contact#contact-form")
  })
  it("can drop the hash", () => {
    expect(contactPath("safeguarding", { hash: false })).toBe("/contact?service=safeguarding")
  })
})
