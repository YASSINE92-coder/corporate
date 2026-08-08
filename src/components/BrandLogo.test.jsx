import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { LanguageProvider } from "../context/LanguageContext"
import BrandLogo from "./BrandLogo"

function renderWithProviders(ui, { route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>
  )
}

describe("BrandLogo", () => {
  it("renders the two-line Fatiha Maitland lockup", () => {
    renderWithProviders(<BrandLogo />)
    expect(screen.getByText("Fatiha Maitland")).toBeInTheDocument()
    expect(screen.getByText("FM Education Services")).toBeInTheDocument()
  })

  it("uses the Arabic homepage label and RTL document on an /ar route", () => {
    renderWithProviders(<BrandLogo />, { route: "/ar" })
    // Brand wordmark stays Latin, but the accessible label is localized.
    const link = screen.getByRole("link")
    expect(link.getAttribute("aria-label")).toContain("الصفحة الرئيسية")
    expect(document.documentElement.dir).toBe("rtl")
    expect(document.documentElement.lang).toBe("ar")
  })

  it("keeps the link inside the active locale", () => {
    renderWithProviders(<BrandLogo />, { route: "/ar/services" })
    // Regression: `to="/"` unwrapped would silently switch an Arabic reader
    // back to the English homepage.
    expect(screen.getByRole("link").getAttribute("href")).toBe("/ar")
  })

  it("links to the plain homepage on English routes", () => {
    renderWithProviders(<BrandLogo />, { route: "/services" })
    expect(screen.getByRole("link").getAttribute("href")).toBe("/")
  })
})
