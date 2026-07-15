import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "../context/ThemeContext"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
