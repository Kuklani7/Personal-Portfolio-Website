import { motion, useReducedMotion } from "motion/react"

export default function Reveal({ children, className = "", as = "div", delay = 0 }) {
  const reducedMotion = useReducedMotion()
  const Component = as === "article" ? motion.article : motion.div

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : Math.min(delay, 0.12), ease: "easeOut" }}
    >
      {children}
    </Component>
  )
}
