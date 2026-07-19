import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
/** Optional: only needed if linked Auto-Reply still fails — send the auto-reply template explicitly */
const AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID

let initialized = false

function ensureInit() {
  if (!initialized && PUBLIC_KEY) {
    emailjs.init({ publicKey: PUBLIC_KEY })
    initialized = true
  }
}

export function isEmailJsConfigured() {
  return (
    Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) &&
    ![SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].some((value) => String(value).startsWith("your_"))
  )
}

/**
 * Build params that satisfy both the main template AND the linked auto-reply template.
 *
 * EmailJS auto-reply "To Email" is usually one of:
 * {{email}}, {{user_email}}, {{from_email}}, {{reply_to}}
 *
 * Dashboard tests fill every variable manually — the site must send the same keys.
 */
function buildTemplateParams({ name, email, organisation, message }) {
  const safeName = name.trim()
  const safeEmail = email.trim()
  const safeOrganisation = (organisation || "Not provided").trim()
  const safeMessage = message.trim()

  return {
    // Name aliases
    name: safeName,
    from_name: safeName,
    user_name: safeName,
    to_name: safeName,

    // Email aliases — critical for auto-reply "To Email"
    email: safeEmail,
    from_email: safeEmail,
    user_email: safeEmail,
    reply_to: safeEmail,
    to_email: safeEmail,

    // Content
    organisation: safeOrganisation,
    message: safeMessage,
  }
}

/**
 * Sends the contact notification. If Auto-Reply is linked in the EmailJS dashboard
 * to this template, EmailJS will also send the auto-reply using the same params.
 *
 * If VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID is set, we also send that template
 * explicitly (extra quota use) as a reliable fallback.
 */
export async function sendContactEmail({ name, email, organisation, message }) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured. Add your keys to the .env file.")
  }

  ensureInit()

  const templateParams = buildTemplateParams({ name, email, organisation, message })

  const mainResult = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)

  if (AUTO_REPLY_TEMPLATE_ID && !String(AUTO_REPLY_TEMPLATE_ID).startsWith("your_")) {
    try {
      await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams)
    } catch (autoReplyError) {
      // Main mail succeeded — surface auto-reply failure without blocking the user
      console.error("EmailJS auto-reply failed:", autoReplyError)
    }
  }

  return mainResult
}
