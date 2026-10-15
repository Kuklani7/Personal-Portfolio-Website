import { motion, useReducedMotion } from "motion/react"

export default function SectionHeading({ children, id, className = "section-title" }) {
  const reduced = useReducedMotion()
  return (
    <motion.h2 id={id} className={className}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.32, ease: "easeOut" }}>
      {children}
    </motion.h2>
  )
}
