import { motion, useMotionTemplate } from "motion/react"
import usePointerField from "../hooks/usePointerField"

export default function Spotlight({ as = "div", className = "", children, ...props }) {
  const { ref, bind, x, y, interactive, opacity } = usePointerField()
  const background = useMotionTemplate`radial-gradient(360px circle at ${x}% ${y}%, color-mix(in srgb, var(--project-accent, var(--accent)) var(--spotlight-strength), transparent), transparent 75%), radial-gradient(620px circle at ${x}% ${y}%, var(--spotlight-halo), transparent 80%)`
  const Component = as === "article" ? motion.article : motion.div
  return (
    <Component {...props} ref={ref} className={`pointer-surface ${className}`} {...bind}>
      <motion.div aria-hidden="true" className="pointer-glow" style={{ background, opacity: interactive ? opacity : 0 }} />
      {children}
    </Component>
  )
}
