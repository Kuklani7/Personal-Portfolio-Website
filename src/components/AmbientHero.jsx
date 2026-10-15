import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"
import useInteractiveMotion from "../hooks/useInteractiveMotion"

export default function AmbientHero({ children }) {
  const section = useRef(null)
  const interactive = useInteractiveMotion()
  const x = useMotionValue(65)
  const y = useMotionValue(35)
  const smoothX = useSpring(x, { stiffness: 85, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 85, damping: 25 })
  const shiftX = useTransform(smoothX, [0, 100], [-7, 7])
  const shiftY = useTransform(smoothY, [0, 100], [-5, 5])
  const background = useMotionTemplate`radial-gradient(ellipse at ${smoothX}% ${smoothY}%, var(--home-pointer-light), transparent 62%)`

  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return
    const bounds = section.current.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width) * 100)
    y.set(((event.clientY - bounds.top) / bounds.height) * 100)
  }

  return (
    <section ref={section} id="home" aria-labelledby="hero-heading" className="hero-section home-section"
      onPointerMove={move} onPointerLeave={() => { x.set(65); y.set(35) }}>
      <div className="home-wash home-wash-blue" aria-hidden="true" />
      <div className="home-wash home-wash-peach" aria-hidden="true" />
      <motion.div aria-hidden="true" className="hero-ambient" style={{ background, opacity: interactive ? 1 : 0 }} />
      <motion.svg className="home-orbit" aria-hidden="true" viewBox="0 0 240 180" fill="none"
        style={{ x: interactive ? shiftX : 0, y: interactive ? shiftY : 0 }}>
        <path d="M22 118C72 171 215 126 207 58C201 11 113 25 114 77C115 121 181 136 222 101" />
        <circle cx="22" cy="118" r="4" />
      </motion.svg>
      {children}
    </section>
  )
}
