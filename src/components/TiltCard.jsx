import { useRef } from "react"
import { motion, useMotionTemplate, useSpring } from "motion/react"
import useInteractiveMotion from "../hooks/useInteractiveMotion"

export default function TiltCard({ children, className = "" }) {
  const card = useRef(null)
  const interactive = useInteractiveMotion()
  const rotateX = useSpring(0, { stiffness: 180, damping: 25 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 25 })
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  function reset() { rotateX.set(0); rotateY.set(0) }
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return
    if (card.current.contains(document.activeElement)) { reset(); return }
    const bounds = card.current.getBoundingClientRect()
    rotateX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5)
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5)
  }
  return (
    <motion.article ref={card} className={`tilt-card ${className}`} style={{ transform: interactive ? transform : "none" }}
      onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset}>
      {children}
    </motion.article>
  )
}
