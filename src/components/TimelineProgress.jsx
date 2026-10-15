import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { useRef } from "react"

export default function TimelineProgress({ children }) {
  const timeline = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 75%", "end 65%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 })
  return (
    <div ref={timeline} className="timeline !mt-6 space-y-6 lg:!mt-0">
      <motion.span aria-hidden="true" className="timeline-progress" style={{ scaleY: reduced ? 1 : progress }} />
      {children}
    </div>
  )
}
