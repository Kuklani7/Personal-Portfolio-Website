import { motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useRef } from "react"
import usePointerField from "../hooks/usePointerField"
import { HeroPointerContext } from "./HeroPointerContext"
import usePageVisible from "../hooks/usePageVisible"

export default function AmbientHero({ children }) {
  const { ref, bind, x, y, offsetX, offsetY, interactive, opacity } = usePointerField({ initialX: 65, initialY: 35 })
  const pageVisible = usePageVisible()
  const unobserved = useRef(null)
  const inView = useInView(typeof IntersectionObserver === "undefined" ? unobserved : ref, { margin: "100px" })
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const shiftX = useTransform(offsetX, (value) => value * 7)
  const slowX = useTransform(offsetX, (value) => value * -4)
  const slowY = useTransform(offsetY, (value) => value * -3)
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, var(--home-pointer-light), transparent 75%), radial-gradient(850px circle at ${x}% ${y}%, var(--ambient-outer), transparent 80%), radial-gradient(720px circle at ${x}% ${y}%, var(--ambient-warm), transparent 78%)`

  function move(event) {
    bind.onPointerMove(event)
    if (!interactive || event.pointerType !== "mouse") return
    pointerX.set(event.clientX)
    pointerY.set(event.clientY)
  }

  return (
    <section ref={ref} id="home" aria-labelledby="hero-heading" className="hero-section home-section" data-ambient-running={pageVisible && inView && !reduced} {...bind} onPointerMove={move}>
      <motion.div className="home-wash home-wash-blue" aria-hidden="true" style={{ x: interactive ? slowX : 0, y: interactive ? slowY : 0 }}><div className="home-wash-drift home-wash-drift-blue" /></motion.div>
      <motion.div className="home-wash home-wash-peach" aria-hidden="true" style={{ x: interactive ? shiftX : 0, y: interactive ? slowY : 0 }}><div className="home-wash-drift home-wash-drift-peach" /></motion.div>
      <motion.div aria-hidden="true" className="hero-ambient" style={{ background, opacity: interactive ? opacity : 0 }} />
      <HeroPointerContext.Provider value={{ x: pointerX, y: pointerY, interactive }}>
        {children}
      </HeroPointerContext.Provider>
    </section>
  )
}
