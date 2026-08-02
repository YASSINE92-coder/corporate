import { describe, it, expect } from "vitest"
import { translate, createT } from "./index"
import en from "./translations/en"
import ar from "./translations/ar"

/** Flatten a nested dictionary to dotted key paths, descending into arrays too. */
function keyPaths(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`))
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

describe("translate", () => {
  it("resolves dotted keys per locale", () => {
    expect(translate("en", "nav.home")).toBe("Home")
    expect(translate("ar", "nav.home")).toBe("الرئيسية")
  })
  it("localizes SEO titles so Arabic pages are not English", () => {
    expect(translate("en", "seo.services.title")).toMatch(/FM Education/)
    expect(translate("ar", "seo.services.title")).toMatch(/[؀-ۿ]/)
  })
  it("falls back to English, then to the key itself", () => {
    // Missing key on any locale returns the key.
    expect(translate("ar", "does.not.exist")).toBe("does.not.exist")
  })
  it("interpolates {{vars}}", () => {
    expect(translate("en", "nav.switchLanguageTo", { name: "العربية" })).toBe(
      "Switch language to العربية"
    )
  })
  it("leaves unknown placeholders intact", () => {
    expect(translate("en", "nav.switchLanguageTo", {})).toContain("{{name}}")
  })
})

describe("createT", () => {
  it("binds a locale", () => {
    const t = createT("ar")
    expect(t("nav.contact")).toBe("اتصل بنا")
  })
})

describe("dictionary parity", () => {
  // Without this, a key added to one locale only silently renders the raw key
  // path (or English) on the other — the failure is invisible until a user hits it.
  it("defines exactly the same keys in English and Arabic", () => {
    const enKeys = keyPaths(en)
    const arKeys = keyPaths(ar)
    expect(arKeys.filter((k) => !enKeys.includes(k))).toEqual([])
    expect(enKeys.filter((k) => !arKeys.includes(k))).toEqual([])
  })

  it("leaves no Arabic value empty", () => {
    const empty = keyPaths(ar).filter((k) => {
      const value = translate("ar", k)
      return typeof value === "string" && value.trim() === ""
    })
    expect(empty).toEqual([])
  })
})
