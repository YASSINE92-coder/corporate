import { Link } from "react-router-dom"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import ServiceSelect from "./ServiceSelect"
import { FIELD_LIMITS } from "../lib/enquiry"

/**
 * Contact enquiry form + success state.
 * State/handlers stay owned by the page so URL prefills remain centralized.
 */
export default function ContactForm({
  form,
  status,
  errorMessage,
  serviceLabel,
  clearSelectionTo,
  onChange,
  onServiceChange,
  onSubmit,
  onReset,
  t,
}) {
  if (status === "success") {
    return (
      <div
        className="flex min-h-[320px] flex-col justify-center gap-6"
        role="status"
        aria-live="polite"
      >
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>{t("contact.successTitle")}</AlertTitle>
          <AlertDescription>{t("contact.successBody")}</AlertDescription>
        </Alert>
        <div className="text-center">
          <Button variant="secondary" onClick={onReset}>
            {t("contact.sendAnother")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <h3 className="mb-2 font-display text-2xl font-semibold" id="contact-form-heading">
        {t("contact.formTitle")}
      </h3>
      {form.service !== "general" ? (
        <p className="mb-6 text-sm text-muted-foreground" role="status">
          {t("contact.prefilling")}{" "}
          <span className="font-medium text-foreground">{serviceLabel}</span>
          {" · "}
          <Link to={clearSelectionTo} className="text-primary underline-offset-4 hover:underline">
            {t("common.clearSelection")}
          </Link>
        </p>
      ) : (
        <p className="mb-6 text-sm text-muted-foreground">{t("contact.formHint")}</p>
      )}

      <form
        className="relative flex flex-col gap-5"
        onSubmit={onSubmit}
        aria-labelledby="contact-form-heading"
        aria-busy={status === "loading"}
      >
        <div
          className="absolute -start-[9999px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t("contact.fullName")}</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={onChange}
              placeholder={t("contact.namePlaceholder")}
              maxLength={FIELD_LIMITS.name}
              required
              disabled={status === "loading"}
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("contact.workEmail")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              placeholder={t("contact.emailPlaceholder")}
              maxLength={FIELD_LIMITS.email}
              required
              disabled={status === "loading"}
              aria-required="true"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="school">{t("contact.school")}</Label>
            <Input
              id="school"
              name="school"
              autoComplete="organization"
              value={form.school}
              onChange={onChange}
              placeholder={t("contact.schoolPlaceholder")}
              maxLength={FIELD_LIMITS.school}
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">{t("contact.role")}</Label>
            <Input
              id="role"
              name="role"
              autoComplete="organization-title"
              value={form.role}
              onChange={onChange}
              placeholder={t("contact.rolePlaceholder")}
              maxLength={FIELD_LIMITS.role}
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label id="service-label">{t("contact.howCanWeHelp")}</Label>
          <ServiceSelect
            name="service"
            value={form.service}
            labelId="service-label"
            disabled={status === "loading"}
            getLabel={(id) => t(`enquiryServices.${id}`)}
            onChange={onServiceChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t("contact.message")}</Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={onChange}
            placeholder={t("contact.messagePlaceholder")}
            maxLength={FIELD_LIMITS.message}
            required
            disabled={status === "loading"}
            aria-required="true"
            className="min-h-[140px] resize-y"
          />
        </div>

        {status === "error" ? (
          <Alert variant="destructive" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>{t("contact.errorTitle")}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            icon={status !== "loading"}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                {t("contact.sending")}
              </>
            ) : (
              t("contact.send")
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
