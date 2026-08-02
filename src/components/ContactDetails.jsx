import { Mail, Phone } from "lucide-react"
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, telHref } from "../lib/contact"

/**
 * Contact sidebar details (email + phone cards).
 *
 * Values are marked `dir="ltr"`: an email address and a "+44 (0) 770…" number are
 * Latin/neutral runs, and letting the RTL paragraph direction reorder them moves
 * the "+" and the brackets to the wrong end of the string. `detail.ltrValue` opts
 * a row in; localised prose rows would not set it.
 */
export default function ContactDetails({ details }) {
  return (
    <address className="not-italic space-y-4">
      {details.map((detail) => {
        const Icon = detail.icon
        const ValueTag = detail.href ? "a" : "p"
        return (
          <div
            key={detail.title}
            className="flex items-start gap-4 rounded-3xl border border-border bg-muted/40 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="rounded-2xl bg-accent p-3 text-accent-foreground" aria-hidden="true">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{detail.title}</h3>
              <ValueTag
                {...(detail.href
                  ? {
                      href: detail.href,
                      "aria-label": `${detail.title}: ${detail.value}`,
                    }
                  : {})}
                dir={detail.ltrValue ? "ltr" : undefined}
                className="inline-block font-medium text-foreground"
              >
                {detail.value}
              </ValueTag>
              <p className="text-sm text-muted-foreground">{detail.subtitle}</p>
            </div>
          </div>
        )
      })}
    </address>
  )
}

export function buildContactDetails(t) {
  return [
    {
      title: t("contact.emailTitle"),
      value: CONTACT_EMAIL,
      subtitle: t("contact.emailSubtitle"),
      icon: Mail,
      href: `mailto:${CONTACT_EMAIL}`,
      ltrValue: true,
    },
    {
      title: t("contact.phoneTitle"),
      value: CONTACT_PHONE_DISPLAY,
      subtitle: t("contact.phoneSubtitle"),
      icon: Phone,
      href: telHref(),
      ltrValue: true,
    },
  ]
}
