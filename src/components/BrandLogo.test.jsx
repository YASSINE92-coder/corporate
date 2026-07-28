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
})
