import { motion, useTransform } from "motion/react"
import usePointerField from "../hooks/usePointerField"

export default function Magnetic({ as = "a", children, className = "", ...props }) {
  const { ref, bind, offsetX, offsetY, interactive } = usePointerField({ enabled: !props.disabled && !props["aria-disabled"] })
  const x = useTransform(offsetX, (value) => value * 3)
  const y = useTransform(offsetY, (value) => value * 2)
  const Component = as === "button" ? motion.button : motion.a
  return (
    <span ref={ref} className="magnetic-target" {...bind}>
      <Component {...props} className={`magnetic ${className}`} style={{ x: interactive ? x : 0, y: interactive ? y : 0 }}>
        {children}
      </Component>
    </span>
  )
}
