import { motion, useMotionTemplate } from "motion/react"
import usePointerField from "../hooks/usePointerField"
import { heroName } from "../motion/presets"

export default function InteractiveName() {
  const { ref, bind, x, y, interactive } = usePointerField()
  const highlight = useMotionTemplate`radial-gradient(ellipse at ${x}% ${y}%, var(--name-highlight), var(--name-base) 62%)`
  return (
    <h1 ref={ref} id="hero-heading" className="home-name" {...bind}>
      <span className="home-name-mask"><motion.span className="home-name-line" custom={0} variants={heroName}>RACHIT</motion.span></span>{" "}
      <span className="home-name-mask"><motion.span className="home-name-line home-surname" custom={1} variants={heroName} style={{ backgroundImage: interactive ? highlight : undefined }}>KUKLANI</motion.span></span>
    </h1>
  )
}
