import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, useTransform } from "motion/react"
import useInteractiveMotion from "./useInteractiveMotion"

export default function usePointerField({ initialX = 50, initialY = 50, enabled = true } = {}) {
  const ref = useRef(null)
  const allowed = useInteractiveMotion()
  const interactive = allowed && enabled
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const smoothX = useSpring(x, { stiffness: 110, damping: 27 })
  const smoothY = useSpring(y, { stiffness: 110, damping: 27 })
  const opacity = useSpring(0, { stiffness: 100, damping: 25 })
  const offsetX = useTransform(smoothX, [0, 100], [-1, 1])
  const offsetY = useTransform(smoothY, [0, 100], [-1, 1])

  function reset() { x.set(initialX); y.set(initialY); opacity.set(0) }
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return
    const element = ref.current
    // Mouse clicks also focus controls. Only keyboard-visible focus should
    // suppress tracking; otherwise one click can freeze an entire section.
    if (!element || (element.contains(document.activeElement) && document.activeElement.matches(":focus-visible"))) { reset(); return }
    const bounds = element.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    x.set(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)))
    y.set(Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)))
    opacity.set(1)
  }
  useEffect(() => {
    if (!interactive) { x.set(initialX); y.set(initialY); opacity.jump(0) }
  }, [interactive, initialX, initialY, x, y, opacity])

  return {
    ref, interactive, x: smoothX, y: smoothY, offsetX, offsetY, opacity,
    bind: { onPointerMove: move, onPointerLeave: reset, onPointerCancel: reset, onFocusCapture: reset },
  }
}
