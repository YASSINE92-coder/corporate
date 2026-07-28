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
  const { t } = useTranslation()
  const brand = t("common.brand")

  // Support a two-part lockup like "Fatiha Maitland-FM Education Services":
  // render the leading name as a refined kicker above the company wordmark.
  const separatorIndex = brand.indexOf("-")
  const hasLockup = separatorIndex > 0 && separatorIndex < brand.length - 1
  const leadName = hasLockup ? brand.slice(0, separatorIndex).trim() : null
  const companyName = hasLockup ? brand.slice(separatorIndex + 1).trim() : brand

  return (
    <Link
      to={to}
      className={cn("inline-flex items-center gap-2.5 font-display font-semibold tracking-tight", className)}
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
            <span className="flex flex-col leading-tight">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] opacity-75 md:text-xs">
                {leadName}
              </span>
              <span className="text-base font-semibold leading-none md:text-lg">{companyName}</span>
            </span>
          ) : (
            <span className="text-lg leading-none md:text-xl">{companyName}</span>
          )}
        </span>
      ) : null}
    </Link>
  )
}
