import { LOCALES } from "../i18n/locales"
import { useLanguage } from "../context/LanguageContext"
import FlagIcon from "./FlagIcon"
import { cn } from "../lib/utils"

/**
 * Header language control — mirrors ThemeToggle chrome
 * (rounded-full buttons inside the existing border/backdrop pill).
 */
export default function LanguageSwitcher({ className }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      dir="ltr"
      className={cn("flex items-center gap-0.5", className)}
    >
      {LOCALES.map((item) => {
        const isActive = locale === item.code
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            aria-label={`Switch language to ${item.name}`}
            title={item.name}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-all duration-300",
              "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-background/95 text-foreground shadow-sm dark:bg-card"
                : "text-current opacity-80 hover:opacity-100"
            )}
          >
            <FlagIcon code={item.flag} title={item.name} className="h-3.5 w-3.5 rounded-full object-cover" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
