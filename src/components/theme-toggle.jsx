import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "../context/ThemeContext"
import { useTranslation } from "../context/LanguageContext"
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme, isDark } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span
        className={cn("inline-flex h-9 w-9 rounded-full border border-border/50 bg-card/40", className)}
        aria-hidden="true"
      />
    )
  }

  const nextLabel = isDark ? t("common.themeLight") : t("common.themeDark")
  const accessibleLabel = `${t("common.toggleTheme")}: ${nextLabel}`

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300",
            "border-border/70 bg-card/80 text-foreground shadow-sm",
            "hover:scale-105 hover:bg-card hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "dark:border-border dark:bg-card/80",
            className
          )}
          aria-label={accessibleLabel}
          aria-pressed={isDark}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -40, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotate: 40, scale: 0.6, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="inline-flex"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-primary" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </TooltipTrigger>
      <TooltipContent>{accessibleLabel}</TooltipContent>
    </Tooltip>
  )
}
