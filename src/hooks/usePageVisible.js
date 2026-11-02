import { useSyncExternalStore } from "react"

function subscribe(callback) {
  document.addEventListener("visibilitychange", callback)
  return () => document.removeEventListener("visibilitychange", callback)
}
export default function usePageVisible() {
  return useSyncExternalStore(subscribe, () => !document.hidden, () => false)
}
