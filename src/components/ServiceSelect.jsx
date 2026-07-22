import { useId } from "react"
import { Check } from "lucide-react"
import { cn } from "../lib/utils"
import { ENQUIRY_SERVICES } from "../lib/enquiry"
import { getServiceIcon } from "../lib/serviceIcons"

/**
 * Modern card-style service picker for the contact form.
 * Accessible radiogroup — replaces the native <select>.
 */
export default function ServiceSelect({
  value,
  onChange,
  getLabel,
  disabled = false,
  name = "service",
  labelId,
}) {
  const groupId = useId()

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      aria-required="true"
      className="grid gap-3 sm:grid-cols-2"
    >
      {ENQUIRY_SERVICES.map((service) => {
        const Icon = getServiceIcon(service.id)
        const selected = value === service.id
        const optionId = `${groupId}-${service.id}`
        const label = getLabel(service.id)

        return (
          <label
            key={service.id}
            htmlFor={optionId}
            className={cn(
              "group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-300 theme-surface",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              selected
                ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/25 dark:bg-primary/10"
                : "border-input bg-background hover:border-primary/40 hover:bg-muted/40",
              disabled && "pointer-events-none opacity-50"
            )}
          >
            <input
              id={optionId}
              type="radio"
              name={name}
              value={service.id}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(service.id)}
              className="sr-only"
            />

            <span
              className={cn(
                "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
              )}
              aria-hidden="true"
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>

            <span className="min-w-0 flex-1 pe-6 pt-1.5">
              <span
                className={cn(
                  "block text-sm font-semibold leading-snug transition-colors",
                  selected ? "text-foreground" : "text-foreground/90"
                )}
              >
                {label}
              </span>
            </span>

            <span
              className={cn(
                "absolute end-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
                selected
                  ? "border-primary bg-primary text-primary-foreground scale-100"
                  : "border-border bg-background text-transparent scale-95"
              )}
              aria-hidden="true"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </label>
        )
      })}
    </div>
  )
}
