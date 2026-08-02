import { Fragment } from "react"

/**
 * Render a translated string that contains inline markup.
 *
 * `translate()` only ever returns text, so a sentence with a link or a bold run
 * in the middle of it would otherwise have to be chopped into fragments per
 * locale — which breaks as soon as a language wants a different word order.
 * Instead the sentence stays whole in the dictionary, with `{{token}}`
 * placeholders where the nodes belong:
 *
 *   body: "Email {{email}} or use our {{form}}."
 *   richText(t("privacy.contact.body"), { email: <a …/>, form: <Link …/> })
 *
 * Arabic can then put the tokens wherever its grammar needs them. Unknown
 * tokens are left visible rather than silently dropped, so a typo shows up.
 *
 * @param {string} template translated string containing `{{token}}` markers
 * @param {Record<string, import("react").ReactNode>} nodes token → element
 */
export function richText(template, nodes = {}) {
  if (typeof template !== "string") return template

  return template.split(/(\{\{\w+\}\})/g).map((part, index) => {
    const token = /^\{\{(\w+)\}\}$/.exec(part)
    if (!token) return part
    const node = nodes[token[1]]
    return <Fragment key={index}>{node === undefined ? part : node}</Fragment>
  })
}
