import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "../context/ThemeContext"
import { useTranslation } from "../context/LanguageContext"
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

/** Menu order: the two explicit choices, then "defer to the OS". */
const OPTIONS = [
  { value: "light", icon: Sun, labelKey: "common.themeLight" },
  { value: "dark", icon: Moon, labelKey: "common.themeDark" },
  { value: "system", icon: Monitor, labelKey: "common.themeSystem" },
]

/**
 * Theme control: a dropdown offering Light / Dark / System.
 *
 * The trigger shows the theme currently *painted* (so System reads as a sun or a
 * moon, matching what is on screen) while the menu marks which *preference* is
 * stored — the distinction that lets System keep following the OS.
 *
 * Radix's DropdownMenu supplies the keyboard model: Enter/Space or ↓ opens it,
 * arrows and type-ahead move through it, Esc closes, focus returns to the trigger.
 */
export function ThemeToggle({ className }) {
  const { theme, preference, setPreference, isDark } = useTheme()
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)

  // The boot script in index.html paints the right theme before React runs, but
  // `preference` is only knowable on the client — so hold a same-size placeholder
  // for one frame instead of baking a possibly-wrong icon into prerendered markup.
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

  const activeOption = OPTIONS.find((option) => option.value === preference) ?? OPTIONS[0]
  const accessibleLabel = `${t("common.toggleTheme")}: ${t(activeOption.labelKey)}`
  // In System mode the trigger mirrors whatever the OS resolved to rather than
  // showing a third icon; the menu is where "System" is marked as selected.
  const TriggerIcon = isDark ? Sun : Moon

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger
            className={cn(
              "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300",
              "border-border/70 bg-card/80 text-foreground shadow-sm",
              "hover:scale-105 hover:bg-card hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "data-[state=open]:bg-card data-[state=open]:shadow-md",
              "dark:border-border dark:bg-card/80",
              className
            )}
            aria-label={accessibleLabel}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={reduceMotion ? false : { opacity: 0, rotate: -40, scale: 0.6, y: 6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 40, scale: 0.6, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                className="inline-flex"
              >
                <TriggerIcon
                  className={cn("h-4 w-4", isDark ? "text-amber-300" : "text-primary")}
                  aria-hidden="true"
                />
              </motion.span>
            </AnimatePresence>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{accessibleLabel}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" className="min-w-[11rem]">
        <DropdownMenuLabel>{t("common.theme")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={preference} onValueChange={setPreference}>
          {OPTIONS.map(({ value, icon: Icon, labelKey }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon className="me-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {t(labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
