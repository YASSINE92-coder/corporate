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
        <span className={cn("text-lg leading-none md:text-xl", textClassName)}>
          {brand}
        </span>
      ) : null}
    </Link>
  )
}
