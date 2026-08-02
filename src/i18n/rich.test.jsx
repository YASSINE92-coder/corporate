import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { richText } from "./rich"
import { translate } from "./index"

describe("richText", () => {
  it("substitutes nodes for {{tokens}} and keeps the surrounding text", () => {
    render(
      <p>{richText("Email {{email}} or use our {{form}}.", { email: <a href="#e">addr</a>, form: <b>form</b> })}</p>
    )
    expect(screen.getByRole("link", { name: "addr" })).toBeInTheDocument()
    expect(screen.getByText(/Email/)).toBeInTheDocument()
    expect(screen.getByText(/or use our/)).toBeInTheDocument()
  })

  it("leaves an unknown token visible rather than dropping it silently", () => {
    render(<p>{richText("Hello {{nobody}}!", {})}</p>)
    expect(screen.getByText(/\{\{nobody\}\}/)).toBeInTheDocument()
  })

  it("passes non-string input straight through", () => {
    expect(richText(undefined)).toBe(undefined)
    expect(richText(42)).toBe(42)
  })

  it("does not require the tokens to appear in the same order in every locale", () => {
    // The whole point: Arabic can reorder the sentence around the same tokens.
    const en = translate("en", "privacy.contactSection.body")
    const ar = translate("ar", "privacy.contactSection.body")
    for (const template of [en, ar]) {
      expect(template).toContain("{{email}}")
      expect(template).toContain("{{form}}")
    }
  })
})

describe("privacy policy localisation", () => {
  it("renders Arabic prose, not English, on the Arabic route", () => {
    // Regression guard: this page's copy was hardcoded English at one point, so
    // /ar/privacy served an English policy under <html lang="ar">.
    for (const key of [
      "privacy.eyebrow",
      "privacy.title",
      "privacy.who.title",
      "privacy.collect.intro",
      "privacy.rights.body",
      "privacy.contactSection.formLabel",
    ]) {
      expect(translate("ar", key)).toMatch(/[؀-ۿ]/)
    }
  })

  it("localises the list items too", () => {
    const items = translate("ar", "privacy.collect.items")
    expect(Array.isArray(items)).toBe(true)
    expect(items.length).toBeGreaterThan(0)
    items.forEach((item) => expect(item).toMatch(/[؀-ۿ]/))
  })

  it("keeps the {{date}} placeholder in both locales", () => {
    expect(translate("en", "privacy.lastUpdated")).toContain("{{date}}")
    expect(translate("ar", "privacy.lastUpdated")).toContain("{{date}}")
  })
})
