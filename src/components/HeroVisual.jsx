import { Component, Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore } from "react"
import { useInView } from "motion/react"
import { Braces, GitBranch, Pause, Play, Terminal } from "lucide-react"
import useInteractiveMotion from "../hooks/useInteractiveMotion"
import HeroFallback from "./HeroFallback"

const HeroScene = lazy(() => import("./HeroScene"))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? <HeroFallback /> : this.props.children }
}

function subscribeVisibility(callback) {
  document.addEventListener("visibilitychange", callback)
  return () => document.removeEventListener("visibilitychange", callback)
}

export default function HeroVisual() {
  const visual = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const interactive = useInteractiveMotion()
  const nearby = useInView(visual, { once: true, margin: "100px" })
  const inView = useInView(visual, { amount: 0.1 })
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => false)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!interactive || !nearby) return
    // Avoid loading the renderer on small screens or data-saving connections.
    const media = window.matchMedia("(min-width: 768px)")
    function update() {
      const savingData = navigator.connection?.saveData === true
      setSupported(media.matches && !savingData)
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [interactive, nearby])

  const showScene = interactive && nearby && supported && !failed
  function move(event) {
    if (!interactive || paused || event.pointerType !== "mouse") return
    const bounds = visual.current.getBoundingClientRect()
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  }
  function reset() { pointer.current.x = 0; pointer.current.y = 0 }

  return (
    <div ref={visual} className="hero-visual" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="editor-titlebar">
        <div aria-hidden="true" className="editor-dots"><span className="bg-[#f18080]" /><span className="bg-[#e8c477]" /><span className="bg-[#70bfa3]" /></div>
        <span>rachit / workspace</span>
        {showScene ? <button type="button" className="scene-pause" aria-label={paused ? "Resume 3D motion" : "Pause 3D motion"} onClick={() => { reset(); setPaused((value) => !value) }}>
          {paused ? <Play size={11} /> : <Pause size={11} />}<span>{paused ? "Resume" : "Pause"}</span>
        </button> : <Terminal size={13} aria-hidden="true" />}
      </div>
      <div className="hero-scene" aria-hidden="true" data-scene-mode={showScene ? "webgl" : "static"}>
        {showScene ? (
          <SceneBoundary onFailure={() => setFailed(true)}>
            <Suspense fallback={<HeroFallback />}>
              {!ready && <div className="scene-placeholder"><HeroFallback /></div>}
              <HeroScene active={inView && pageVisible && !paused} pointer={pointer} onReady={() => setReady(true)} onFailure={() => { setFailed(true); setReady(false) }} />
            </Suspense>
          </SceneBoundary>
        ) : <HeroFallback />}
        <div className="scene-coordinate scene-coordinate-top">geometry / torus-knot</div>
        <div className="scene-coordinate scene-coordinate-bottom">x · y · z</div>
      </div>
      <div className="hero-focus-code font-mono">
        <p className="flex items-center gap-2 text-[10px] text-slate-400"><Braces size={12} className="text-blue-300" />engineer.js</p>
        <p className="mt-2"><span className="syntax-keyword">const</span> <span className="syntax-name">focus</span> = <span className="syntax-string">"Software + data analytics"</span>;</p>
      </div>
      <div className="editor-status"><span className="flex items-center gap-1.5"><GitBranch size={12} />main</span><span>Problem solver · Always learning</span></div>
    </div>
  )
}
