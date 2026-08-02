/**
 * Device capability probes.
 *
 * `canPlaceCalls()` answers one question: will a `tel:` link actually dial?
 * The signal is capability-based rather than a UA string match — a coarse
 * primary pointer plus a touchscreen is what phones and phone-shaped tablets
 * report, and it stays correct for devices that did not exist when this shipped.
 * The UA check is only a last-resort tiebreaker for browsers that lie about or
 * omit `pointer` media queries; it never overrides a confident media-query answer.
 */

/** Phone/tablet UA tokens — the fallback signal, never the primary one. */
const MOBILE_UA = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile|Silk/i

export function canPlaceCalls() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false

  const query = (q) => typeof window.matchMedia === "function" && window.matchMedia(q).matches

  // A coarse *primary* pointer means the main input is a finger or stylus.
  const coarsePrimaryPointer = query("(pointer: coarse)")
  // Hover-capable primary input (mouse/trackpad) is the desktop tell.
  const hoverCapable = query("(hover: hover) and (pointer: fine)")
  const touchPoints = navigator.maxTouchPoints ?? 0

  // iPadOS reports a desktop UA but still dials; a coarse pointer catches it.
  if (coarsePrimaryPointer && touchPoints > 0) return true
  if (hoverCapable && !coarsePrimaryPointer) return false

  // Media queries were inconclusive (older or non-standard browsers).
  return touchPoints > 0 || MOBILE_UA.test(navigator.userAgent || "")
}
