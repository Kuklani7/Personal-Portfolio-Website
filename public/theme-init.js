// Runs synchronously in <head>, before the app and its styles are rendered.
// Keep the storage key in sync with src/theme/ThemeProvider.jsx.
;(() => {
  let preference = "system"
  try {
    const saved = localStorage.getItem("portfolio-theme")
    if (saved === "light" || saved === "dark") preference = saved
  } catch { /* Storage may be unavailable; system preference still works. */ }
  const theme = preference === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference
  document.documentElement.dataset.theme = theme
  document.documentElement.dataset.themePreference = preference
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#1C1729" : "#FAF8F4")
})()
