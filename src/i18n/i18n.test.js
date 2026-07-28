import { describe, it, expect } from "vitest"
import { translate, createT } from "./index"

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
