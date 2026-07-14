import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "../lib/utils"

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "p-2 rounded-md transition-colors",
          theme === "light" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        aria-label="Light mode"
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "p-2 rounded-md transition-colors",
          theme === "dark" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        aria-label="Dark mode"
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "p-2 rounded-md transition-colors",
          theme === "system" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        aria-label="System mode"
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  )
}
