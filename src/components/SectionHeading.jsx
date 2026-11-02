import { useContext } from "react"
import { motion } from "motion/react"
import { RevealContext } from "../motion/RevealContext"
import useEntrance from "../hooks/useEntrance"
import { fadeUp } from "../motion/presets"

export default function SectionHeading({ children, id, className = "section-title" }) {
  const grouped = useContext(RevealContext)
  return grouped ? <h2 id={id} className={className}>{children}</h2> : <AnimatedHeading id={id} className={className}>{children}</AnimatedHeading>
}

function AnimatedHeading({ children, id, className }) {
  const { ref, controls } = useEntrance({ amount: 0.2 })
  return (
    <motion.h2 ref={ref} id={id} className={className} initial={false} animate={controls} variants={fadeUp}>
      {children}
    </motion.h2>
  )
}
