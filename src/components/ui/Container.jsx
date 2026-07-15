import { cn } from "../../lib/utils"

export function Container({ children, className, as: Component = "div" }) {
  return (
    <Component className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  )
}

export function Section({ children, className, id, background = "default" }) {
  const backgrounds = {
    default: "bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50",
    muted: "bg-slate-50 text-slate-900 dark:bg-slate-900/70 dark:text-slate-50",
    accent: "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white",
  }

  return (
    <section id={id} className={cn("py-20 md:py-28", backgrounds[background], className)}>
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={cn("mx-auto mb-14 max-w-3xl", align === "left" ? "ml-0" : "text-center") }>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  )
}
