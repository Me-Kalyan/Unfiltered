"use client"

import { useEffect, useState, useCallback } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || stored === "light") {
      setTheme(stored)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  // Prevent hydration mismatch - render a placeholder until mounted
  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl ${className}`} />
    )
  }

  return (
    <button
      onClick={toggle}
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200
        ${theme === "dark"
          ? "bg-[#2a211d] hover:bg-[#362b25] text-amber-400"
          : "bg-gradient-to-br from-[#d4a5a5]/15 to-[#e5c5c5]/25 hover:from-[#d4a5a5]/30 hover:to-[#e5c5c5]/40 text-[#8a7a7a]"
        } ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
