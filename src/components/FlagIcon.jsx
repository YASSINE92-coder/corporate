import { cn } from "../lib/utils"

/** Local SVG flag from /public/flags/{code}.svg */
export default function FlagIcon({ code, title, className }) {
  return (
    <img
      src={`/flags/${code}.svg`}
      alt={title || code.toUpperCase()}
      width={28}
      height={21}
      loading="lazy"
      decoding="async"
      className={cn("inline-block h-4 w-5 rounded-sm object-cover shadow-sm", className)}
    />
  )
}
