import { Children } from "react"
import { motion, useReducedMotion } from "motion/react"

const container = { visible: { transition: { staggerChildren: 0.055 } } }
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

export default function HeroIntro({ children }) {
  const reduced = useReducedMotion()
  return (
    <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={reduced ? undefined : container}>
      {Children.toArray(children).map((child, index) => (
        <motion.div key={child.key ?? index} variants={reduced ? undefined : item}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
