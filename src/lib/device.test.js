import { describe, it, expect, afterEach, vi } from "vitest"
import { canPlaceCalls } from "./device"

/**
 * Stub the two signals `canPlaceCalls` reads. `queries` maps a media query
 * string to whether it matches; anything unlisted is treated as "browser does
 * not understand this query" (no match), which is what the fallback branch is for.
 *
 * jsdom's navigator has no `maxTouchPoints` at all — the same situation as an old
 * browser — so these are defined rather than spied on, and restored afterwards.
 */
const originalDescriptors = {}

function stubEnvironment({ queries = {}, maxTouchPoints = 0, userAgent = "test" }) {
  vi.stubGlobal("matchMedia", (query) => ({ matches: !!queries[query] }))

  for (const [key, value] of Object.entries({ maxTouchPoints, userAgent })) {
    if (!(key in originalDescriptors)) {
      originalDescriptors[key] = Object.getOwnPropertyDescriptor(Navigator.prototype, key) ?? null
    }
    Object.defineProperty(navigator, key, { value, configurable: true })
  }
}

function restoreEnvironment() {
  for (const [key, descriptor] of Object.entries(originalDescriptors)) {
    delete navigator[key]
    if (descriptor) Object.defineProperty(Navigator.prototype, key, descriptor)
  }
}

const COARSE = "(pointer: coarse)"
const FINE_HOVER = "(hover: hover) and (pointer: fine)"

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  restoreEnvironment()
})

describe("canPlaceCalls", () => {
  it("says yes for a phone: coarse pointer plus a touchscreen", () => {
    stubEnvironment({
      queries: { [COARSE]: true },
      maxTouchPoints: 5,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
    })
    expect(canPlaceCalls()).toBe(true)
  })

  it("says no for a desktop with a mouse", () => {
    stubEnvironment({
      queries: { [FINE_HOVER]: true },
      maxTouchPoints: 0,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    })
    expect(canPlaceCalls()).toBe(false)
  })

  it("says yes for iPadOS, which reports a desktop UA but a coarse pointer", () => {
    stubEnvironment({
      queries: { [COARSE]: true },
      maxTouchPoints: 5,
      // iPadOS deliberately claims to be a Mac; UA sniffing alone gets this wrong.
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    })
    expect(canPlaceCalls()).toBe(true)
  })

  it("says no for a touchscreen laptop, where the primary pointer is still a mouse", () => {
    stubEnvironment({
      queries: { [FINE_HOVER]: true },
      maxTouchPoints: 10,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    })
    expect(canPlaceCalls()).toBe(false)
  })

  it("falls back to touch points when pointer media queries are unsupported", () => {
    stubEnvironment({ queries: {}, maxTouchPoints: 5, userAgent: "OldBrowser/1.0" })
    expect(canPlaceCalls()).toBe(true)
  })

  it("falls back to the UA only when there is nothing better to go on", () => {
    stubEnvironment({
      queries: {},
      maxTouchPoints: 0,
      userAgent: "Mozilla/5.0 (Linux; Android 14) Mobile Safari/537.36",
    })
    expect(canPlaceCalls()).toBe(true)
  })

  it("defaults to no when every signal is absent", () => {
    stubEnvironment({ queries: {}, maxTouchPoints: 0, userAgent: "Unknown/1.0" })
    expect(canPlaceCalls()).toBe(false)
  })
})
