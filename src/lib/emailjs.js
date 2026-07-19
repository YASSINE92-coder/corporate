import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

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
 * Params for the main contact template.
 * Linked Auto-Reply in the EmailJS dashboard reuses these automatically
 * (do not send the auto-reply template a second time from code).
 */
function buildTemplateParams({ name, email, message }) {
  const safeName = name.trim()
  const safeEmail = email.trim()
  const safeMessage = message.trim()

  return {
    name: safeName,
    from_name: safeName,
    user_name: safeName,
    to_name: safeName,

    email: safeEmail,
    from_email: safeEmail,
    user_email: safeEmail,
    reply_to: safeEmail,
    to_email: safeEmail,

    message: safeMessage,
  }
}

/**
 * Sends once via the main template.
 * Auto-reply must be configured only in EmailJS (template → Auto-Reply tab).
 */
export async function sendContactEmail({ name, email, message }) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured. Add your keys to the .env file.")
  }

  ensureInit()

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    buildTemplateParams({ name, email, message })
  )
}
