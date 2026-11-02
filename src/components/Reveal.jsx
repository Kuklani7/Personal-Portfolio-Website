import { motion } from "motion/react"
import useEntrance from "../hooks/useEntrance"
import { RevealContext } from "../motion/RevealContext"
import { fadeUp, stagger } from "../motion/presets"

export default function Reveal({ children, className = "", as = "div", delay = 0, sequence = false, onMount = false, ...props }) {
  const { ref, controls, finish } = useEntrance({ onMount })
  const Component = as === "article" ? motion.article : as === "ul" ? motion.ul : motion.div

  return (
    <RevealContext.Provider value={true}><Component {...props} ref={ref}
      className={className}
      initial={false} animate={controls} variants={sequence ? stagger : fadeUp} custom={delay}
      onFocusCapture={finish}
    >
      {children}
    </Component></RevealContext.Provider>
  )
}
