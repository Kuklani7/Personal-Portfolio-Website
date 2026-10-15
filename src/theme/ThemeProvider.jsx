import { useCallback, useEffect, useRef, useState } from "react"
import { ThemeContext } from "./ThemeContext"

const storageKey = "portfolio-theme"
const systemQuery = "(prefers-color-scheme: dark)"
const systemTheme = () => window.matchMedia(systemQuery).matches ? "dark" : "light"

export default function ThemeProvider({ children }) {
  const [selection, setSelection] = useState(() => ({
    theme: document.documentElement.dataset.theme || systemTheme(),
    preference: document.documentElement.dataset.themePreference || "system",
  }))
  const transitionTimer = useRef(null)

  const apply = useCallback((theme, preference) => {
    const root = document.documentElement
    clearTimeout(transitionTimer.current)
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-transition")
      transitionTimer.current = window.setTimeout(() => root.classList.remove("theme-transition"), 450)
    } else root.classList.remove("theme-transition")
    root.dataset.theme = theme
    root.dataset.themePreference = preference
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#1C1729" : "#FAF8F4")
    setSelection({ theme, preference })
  }, [])

  function toggleTheme() {
    const next = selection.theme === "dark" ? "light" : "dark"
    try { localStorage.setItem(storageKey, next) } catch { /* Keep the choice for this visit. */ }
    apply(next, next)
  }

  useEffect(() => {
    if (selection.preference !== "system") return
    const media = window.matchMedia(systemQuery)
    function update() { apply(media.matches ? "dark" : "light", "system") }
    media.addEventListener("change", update)
    // Catch a preference change between the early bootstrap and subscription.
    if ((media.matches ? "dark" : "light") !== document.documentElement.dataset.theme) update()
    return () => media.removeEventListener("change", update)
  }, [selection.preference, apply])

  useEffect(() => {
    function synchronize(event) {
      if (event.key !== storageKey && event.key !== null) return
      const preference = event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system"
      apply(preference === "system" ? systemTheme() : preference, preference)
    }
    window.addEventListener("storage", synchronize)
    return () => { window.removeEventListener("storage", synchronize); clearTimeout(transitionTimer.current) }
  }, [apply])

  return <ThemeContext.Provider value={{ theme: selection.theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
