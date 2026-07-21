import { cn } from "../lib/utils"

/**
 * SEO-friendly image: required alt, lazy by default, async decode.
 * Use priority for above-the-fold heroes (disables lazy loading).
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn(className)}
      {...props}
    />
  )
}
