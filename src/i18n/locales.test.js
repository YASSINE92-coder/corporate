import { describe, it, expect } from "vitest"
import { localePrefix, splitLocalePath, withLocale, DEFAULT_LOCALE } from "./locales"

const BASE_PATHS = ["/", "/about", "/services", "/contact", "/privacy"]

describe("localePrefix", () => {
  it("has no prefix for the default locale", () => {
    expect(localePrefix(DEFAULT_LOCALE)).toBe("")
    expect(localePrefix("en")).toBe("")
  })
  it("prefixes non-default locales", () => {
    expect(localePrefix("ar")).toBe("/ar")
  })
})

describe("splitLocalePath", () => {
  it("treats unprefixed paths as the default locale", () => {
    expect(splitLocalePath("/")).toEqual({ locale: "en", path: "/" })
    expect(splitLocalePath("/about")).toEqual({ locale: "en", path: "/about" })
  })
  it("extracts a non-default locale prefix", () => {
    expect(splitLocalePath("/ar")).toEqual({ locale: "ar", path: "/" })
    expect(splitLocalePath("/ar/services")).toEqual({ locale: "ar", path: "/services" })
  })
  it("tolerates a trailing slash", () => {
    expect(splitLocalePath("/ar/")).toEqual({ locale: "ar", path: "/" })
    expect(splitLocalePath("/about/")).toEqual({ locale: "en", path: "/about" })
  })
})

describe("withLocale", () => {
  it("prefixes for non-default and leaves default untouched", () => {
    expect(withLocale("/services", "ar")).toBe("/ar/services")
    expect(withLocale("/", "ar")).toBe("/ar")
    expect(withLocale("/services", "en")).toBe("/services")
    expect(withLocale("/", "en")).toBe("/")
  })
  it("round-trips with splitLocalePath for every route and locale", () => {
    for (const path of BASE_PATHS) {
      for (const locale of ["en", "ar"]) {
        expect(splitLocalePath(withLocale(path, locale))).toEqual({ locale, path })
      }
    }
  })
})
