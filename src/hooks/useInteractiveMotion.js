import { useSyncExternalStore } from "react"

// Hybrid laptops may report touch as their primary pointer while a mouse is available.
const query = "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)"

function subscribe(callback) {
  const media = window.matchMedia(query)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

export default function useInteractiveMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}
