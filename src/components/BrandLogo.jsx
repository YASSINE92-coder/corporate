import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { useTranslation } from "../context/LanguageContext"

/**
 * Brand mark used in navbar/footer — keeps identity consistent without a raster logo file.
 */
export default function BrandLogo({
  to = "/",
  className,
  markClassName,
  textClassName,
  showWordmark = true,
  style,
}) {
  const { t, localizePath } = useTranslation()
  const brand = t("common.brand")

  // Support a two-part lockup like "Fatiha Maitland-FM Education Services":
  // both lines share one voice — same family, weight, size and colour — so the
  // name reads as part of the brand rather than a faint kicker above it.
  const separatorIndex = brand.indexOf("-")
  const hasLockup = separatorIndex > 0 && separatorIndex < brand.length - 1
  const leadName = hasLockup ? brand.slice(0, separatorIndex).trim() : null
  const companyName = hasLockup ? brand.slice(separatorIndex + 1).trim() : brand

  return (
    <Link
      // Localized so the logo stays inside the active locale — on /ar pages it
      // must lead to /ar, not silently switch the reader back to English.
      to={localizePath(to)}
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-semibold tracking-tight",
        className
      )}
      style={style}
      aria-label={`${brand} — ${t("nav.goToHomepage")}`}
    >
      <span
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm",
          markClassName
        )}
        aria-hidden="true"
      >
        FM
      </span>
      {showWordmark ? (
        <span className={cn(textClassName)}>
          {hasLockup ? (
            <span className="flex flex-col">
              <span className="text-base font-semibold leading-tight md:text-lg">{leadName}</span>
              <span className="text-base font-semibold leading-tight md:text-lg">
                {companyName}
              </span>
            </span>
          ) : (
            <span className="text-lg leading-none md:text-xl">{companyName}</span>
          )}
        </span>
      ) : null}
    </Link>
  )
}
