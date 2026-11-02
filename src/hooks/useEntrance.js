import { useLayoutEffect, useRef } from "react"
import { useAnimationControls, useInView, useReducedMotion } from "motion/react"

// Content starts visible. Only a working observer/animation starts the reveal.
// If initialization fails, essential content never stays hidden by default.
export default function useEntrance({ onMount = false, amount = 0.08 } = {}) {
  const ref = useRef(null)
  const completed = useRef(false)
  const unobserved = useRef(null)
  const inView = useInView(typeof IntersectionObserver === "undefined" ? unobserved : ref, { once: true, amount })
  const reduced = useReducedMotion()
  const controls = useAnimationControls()
  const visible = onMount || inView

  useLayoutEffect(() => {
    if (visible) ref.current?.setAttribute("data-revealed", "true")
    if (reduced) { completed.current = true; controls.set("settled"); return }
    if (!visible || completed.current) return
    let current = true
    controls.start("enter").then(() => { if (current) completed.current = true }).catch(() => {
      if (current) controls.set("settled")
    })
    return () => { current = false; controls.stop() }
  }, [controls, visible, reduced])

  function finish() {
    completed.current = true
    controls.stop()
    controls.set("settled")
  }
  return { ref, controls, finish }
}
