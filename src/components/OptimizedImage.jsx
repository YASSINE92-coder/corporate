import { cn } from "../lib/utils"

/**
 * Responsive image helper. Visual output unchanged when only src/alt are passed.
 * Optional webp/avif/srcSet for when client assets are available.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  webp,
  avif,
  srcSet,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px",
  style,
  ...props
}) {
  const loading = priority ? "eager" : "lazy"
  const fetchPriority = priority ? "high" : "auto"

  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={cn(className)}
      style={style}
      {...props}
    />
  )

  if (!webp && !avif) return img

  return (
    <picture>
      {avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
      {img}
    </picture>
  )
}
