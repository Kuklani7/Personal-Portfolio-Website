import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react"
import { useRef } from "react"
import useInteractiveMotion from "../hooks/useInteractiveMotion"

export default function AmbientHero({ children }) {
  const section = useRef(null)
  const interactive = useInteractiveMotion()
  const x = useMotionValue(65)
  const y = useMotionValue(35)
  const smoothX = useSpring(x, { stiffness: 85, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 85, damping: 25 })
  const background = useMotionTemplate`radial-gradient(ellipse at ${smoothX}% ${smoothY}%, #225bc51a, transparent 55%)`

  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return
    const bounds = section.current.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width) * 100)
    y.set(((event.clientY - bounds.top) / bounds.height) * 100)
  }

  return (
    <section ref={section} id="home" aria-labelledby="hero-heading" className="hero-section" onPointerMove={move} onPointerLeave={() => { x.set(65); y.set(35) }}>
      <motion.div aria-hidden="true" className="hero-ambient" style={{ background, opacity: interactive ? 1 : 0 }} />
      {children}
    </section>
  )
}
