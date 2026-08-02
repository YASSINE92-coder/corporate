import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { sendContactEmail } from "../lib/emailjs"
import { CONTACT_EMAIL, CONTACT_PHONE, contactPath } from "../lib/enquiry"
import { useTranslation } from "../context/LanguageContext"

const emptyForm = { name: "", email: "", message: "", website: "" }

/**
 * Compact enquiry form used inside the floating contact bubble.
 * Reuses the same EmailJS submission path as the main contact page
 * (src/lib/emailjs.js) — the send logic itself is never duplicated.
 */
export default function QuickEnquiryDialog({ open, onOpenChange }) {
  const { t, localizePath } = useTranslation()
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetState = () => {
    setStatus("idle")
    setErrorMessage("")
    setForm(emptyForm)
  }

  const handleOpenChange = (next) => {
    onOpenChange(next)
    if (!next) resetState()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    if (form.website?.trim()) {
      setStatus("success")
      setForm(emptyForm)
      return
    }

    try {
      const { website: _honeypot, ...payload } = form
      await sendContactEmail({ ...payload, service: "general", school: "", role: "" })
      setStatus("success")
      setForm(emptyForm)
      toast.success(t("contact.toastSuccess"), { description: t("contact.toastSuccessDesc") })
    } catch (error) {
      const message = error?.text || error?.message || "Something went wrong. Please try again."
      setStatus("error")
      setErrorMessage(message)
      toast.error(t("contact.toastError"), { description: message })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent closeLabel={t("common.close")}>
        <DialogHeader>
          <DialogTitle>{t("floating.needSupport")}</DialogTitle>
          <DialogDescription>{t("floating.replySameDay")}</DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col gap-4 py-1" role="status" aria-live="polite">
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>{t("contact.successTitle")}</AlertTitle>
              <AlertDescription>{t("contact.successBody")}</AlertDescription>
            </Alert>
            <Button variant="secondary" onClick={() => handleOpenChange(false)}>
              {t("common.close")}
            </Button>
          </div>
        ) : (
          <form
            className="relative flex flex-col gap-4"
            onSubmit={handleSubmit}
            aria-label={t("floating.needSupport")}
            aria-busy={status === "loading"}
          >
            <div className="absolute -start-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="quick-enquiry-website">Website</label>
              <input
                id="quick-enquiry-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-enquiry-name">{t("contact.fullName")}</Label>
              <Input
                id="quick-enquiry-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("contact.namePlaceholder")}
                required
                disabled={status === "loading"}
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-enquiry-email">{t("contact.workEmail")}</Label>
              <Input
                id="quick-enquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("contact.emailPlaceholder")}
                required
                disabled={status === "loading"}
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-enquiry-message">{t("contact.message")}</Label>
              <Textarea
                id="quick-enquiry-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.messagePlaceholder")}
                required
                disabled={status === "loading"}
                aria-required="true"
                className="min-h-[110px] resize-y"
              />
            </div>

            {status === "error" ? (
              <Alert variant="destructive" role="alert">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertTitle>{t("contact.errorTitle")}</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}

            <Button type="submit" variant="primary" icon={status !== "loading"} disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {t("contact.sending")}
                </>
              ) : (
                t("contact.send")
              )}
            </Button>

            <DialogFooter className="mt-0 flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-border pt-4 text-center text-xs text-muted-foreground">
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline-offset-4 hover:text-foreground hover:underline">
                {t("floating.emailUs")}
              </a>
              <span aria-hidden="true">·</span>
              <a href={`tel:${CONTACT_PHONE}`} className="underline-offset-4 hover:text-foreground hover:underline">
                {t("floating.callNow")}
              </a>
              <span aria-hidden="true">·</span>
              <Link
                to={localizePath(contactPath())}
                onClick={() => handleOpenChange(false)}
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {t("floating.requestConsultation")}
              </Link>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
