import { motion, useMotionTemplate, useTransform } from "motion/react"
import usePointerField from "../hooks/usePointerField"

export default function AmbientHero({ children }) {
  const { ref, bind, x, y, offsetX, offsetY, interactive, opacity } = usePointerField({ initialX: 65, initialY: 35 })
  const shiftX = useTransform(offsetX, (value) => value * 7)
  const shiftY = useTransform(offsetY, (value) => value * 5)
  const slowX = useTransform(offsetX, (value) => value * -4)
  const slowY = useTransform(offsetY, (value) => value * -3)
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, var(--home-pointer-light), transparent 75%), radial-gradient(850px circle at ${x}% ${y}%, var(--ambient-outer), transparent 80%), radial-gradient(720px circle at ${x}% ${y}%, var(--ambient-warm), transparent 78%)`

  return (
    <section ref={ref} id="home" aria-labelledby="hero-heading" className="hero-section home-section" {...bind}>
      <motion.div className="home-wash home-wash-blue" aria-hidden="true" style={{ x: interactive ? slowX : 0, y: interactive ? slowY : 0 }} />
      <motion.div className="home-wash home-wash-peach" aria-hidden="true" style={{ x: interactive ? shiftX : 0, y: interactive ? slowY : 0 }} />
      <motion.div aria-hidden="true" className="hero-ambient" style={{ background, opacity: interactive ? opacity : 0 }} />
      <motion.svg className="home-orbit" aria-hidden="true" viewBox="0 0 240 180" fill="none"
        style={{ x: interactive ? shiftX : 0, y: interactive ? shiftY : 0 }}>
        <path d="M22 118C72 171 215 126 207 58C201 11 113 25 114 77C115 121 181 136 222 101" />
        <circle cx="22" cy="118" r="4" />
      </motion.svg>
      {children}
    </section>
  )
}
