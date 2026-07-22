/** Shared FAQ keys for UI accordion + JSON-LD schema. */
export const FAQ_KEYS = ["safeguarding", "send", "international", "response"]

/**
 * @param {(key: string) => string} t
 * @returns {{ key: string, question: string, answer: string }[]}
 */
export function getFaqs(t) {
  return FAQ_KEYS.map((key) => ({
    key,
    question: t(`faq.items.${key}.q`),
    answer: t(`faq.items.${key}.a`),
  }))
}
