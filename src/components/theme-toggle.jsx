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
        "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-card dark:border-border dark:bg-card/80",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
