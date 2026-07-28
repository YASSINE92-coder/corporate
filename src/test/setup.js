import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// With Vitest globals disabled, Testing Library's automatic per-test cleanup
// isn't registered — do it explicitly so the DOM doesn't leak between tests.
afterEach(() => cleanup())
