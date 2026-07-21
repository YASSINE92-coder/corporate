import { cn } from "../../lib/utils"

export function Container({ children, className, as: Component = "div" }) {
  return (
    <Component className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  )
}

export function Section({ children, className, id, background = "default", ...props }) {
  const backgrounds = {
    default: "bg-background text-foreground",
    muted: "bg-muted/60 text-foreground dark:bg-muted/40",
    accent: "hero-gradient text-white",
  }

  return (
    <section id={id} className={cn("py-20 md:py-28", backgrounds[background], className)} {...props}>
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, description, align = "center", id }) {
  return (
    <div className={cn("mx-auto mb-14 max-w-3xl", align === "left" ? "ml-0 text-left" : "text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance"
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-lg leading-8 text-muted-foreground", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
