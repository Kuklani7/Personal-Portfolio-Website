import { motion, useMotionTemplate } from "motion/react"
import usePointerField from "../hooks/usePointerField"

export default function InteractiveName() {
  const { ref, bind, x, y, interactive } = usePointerField()
  const highlight = useMotionTemplate`radial-gradient(ellipse at ${x}% ${y}%, var(--name-highlight), var(--name-base) 62%)`
  return (
    <h1 ref={ref} id="hero-heading" className="home-name" {...bind}>
      <span className="home-name-line">RACHIT</span>{" "}
      <motion.span className="home-name-line home-surname" style={{ backgroundImage: interactive ? highlight : undefined }}>KUKLANI</motion.span>
    </h1>
  )
}
