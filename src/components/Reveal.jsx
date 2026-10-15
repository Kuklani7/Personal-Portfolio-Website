import { motion, useReducedMotion } from "motion/react"

export default function Reveal({ children, className = "", as = "div" }) {
  const reducedMotion = useReducedMotion()
  const Component = as === "article" ? motion.article : motion.div

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </Component>
  )
}
