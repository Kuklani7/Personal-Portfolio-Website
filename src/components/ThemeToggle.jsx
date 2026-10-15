import { useId } from "react"
import { motion, useReducedMotion } from "motion/react"
import useTheme from "../hooks/useTheme"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduced = useReducedMotion()
  const maskId = useId()
  const dark = theme === "dark"
  const transition = { duration: reduced ? 0 : 0.36, ease: "easeInOut" }
  return (
    <motion.button type="button" className="theme-toggle" onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      whileTap={reduced ? undefined : { scale: 0.94 }}>
      <motion.svg width="25" height="25" viewBox="0 0 32 32" fill="none" aria-hidden="true"
        initial={false} animate={{ rotate: dark ? -18 : 0 }} transition={transition}>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="white" />
            <motion.circle r="8" fill="black" initial={false}
              animate={{ cx: dark ? 21 : 35, cy: dark ? 10 : -3 }} transition={transition} />
          </mask>
        </defs>
        <motion.g initial={false} animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.6 : 1, rotate: dark ? -35 : 0 }}
          transition={transition} style={{ transformOrigin: "16px 16px" }} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M16 2v3M16 27v3M2 16h3M27 16h3M6.1 6.1l2.1 2.1M23.8 23.8l2.1 2.1M6.1 25.9l2.1-2.1M23.8 8.2l2.1-2.1" />
        </motion.g>
        <motion.circle cx="16" cy="16" fill="currentColor" mask={`url(#${maskId})`}
          initial={false} animate={{ r: dark ? 10 : 7 }} transition={transition} />
      </motion.svg>
    </motion.button>
  )
}
