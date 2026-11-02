import { Children } from "react"
import { motion } from "motion/react"
import useEntrance from "../hooks/useEntrance"
import { heroStage, stagger } from "../motion/presets"

export default function HeroIntro({ children, className = "" }) {
  const { ref, controls, finish } = useEntrance({ onMount: true })
  return (
    <motion.div ref={ref} className={className} initial={false} animate={controls} variants={stagger} onFocusCapture={finish}>
      {Children.toArray(children).map((child, index) => (
        <motion.div key={child.key ?? index} custom={index} variants={index === 1 || index === 2 ? undefined : heroStage}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
