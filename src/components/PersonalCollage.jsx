import { useContext, useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { HeroPointerContext } from "./HeroPointerContext"
import { collagePhotos } from "../data/collagePhotos"
import "../styles/collage.css"

// Use only the glob's keys to discover available files; never import the photos
// as JS modules. Images keep their normal /collage/ public URLs.
// Vite updates this list on file changes and includes it at production build.
const photoAssets = import.meta.glob("/public/collage/*.{jpg,jpeg,png,webp,avif}", {
  query: "?url",
  import: "default",
})

const layers = [
  { name: "main", rotation: 4, depth: 6, delay: 0.12 },
  { name: "secondary", rotation: -10, depth: -10, delay: 0.21 },
  { name: "accent", rotation: 9, depth: 14, delay: 0.3 },
]

function CollagePhoto({ photo, index, offsetX, offsetY, interactive }) {
  const reduced = useReducedMotion()
  const layer = layers[index]
  const targetX = useTransform(offsetX, value => value * layer.depth)
  const targetY = useTransform(offsetY, value => value * layer.depth * 0.8)
  const x = useSpring(targetX, { stiffness: 105, damping: 24, mass: 0.8 })
  const y = useSpring(targetY, { stiffness: 105, damping: 24, mass: 0.8 })
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const src = Object.hasOwn(photoAssets, `/public${photo.src}`) ? photo.src : undefined
  const number = String(index + 1).padStart(2, "0")

  return (
    <motion.div className={`collage-layer collage-layer-${layer.name}`} style={{ x: interactive ? x : 0, y: interactive ? y : 0 }}>
      <motion.figure className="collage-photo"
        initial={reduced ? false : { opacity: 0, y: 12, rotate: layer.rotation - 2 }}
        animate={{ opacity: 1, y: 0, rotate: layer.rotation }}
        whileHover={interactive ? { y: -6, rotate: layer.rotation * 0.55 } : undefined}
        transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : layer.delay, ease: [0.2, 0.65, 0.3, 1], y: { duration: reduced ? 0 : 0.3, delay: 0 }, rotate: { duration: reduced ? 0 : 0.3, delay: 0 } }}>
        <div className="collage-photo-surface">
          {!loaded && (
            <div className="collage-placeholder">
              <span className="collage-placeholder-number" aria-hidden="true">{number}</span>
              <span className="collage-placeholder-label">Photo {number}</span>
              <span className="sr-only">Placeholder. Personal photograph not yet provided.</span>
            </div>
          )}
          {src && !failed && (
            <img className="collage-image" src={src} alt={photo.alt}
              width={index === 2 ? 600 : 640} height={index === 0 ? 800 : index === 1 ? 704 : 500}
              decoding="async" draggable="false"
              style={{ objectPosition: photo.objectPosition, opacity: loaded ? 1 : 0 }}
              onLoad={() => setLoaded(true)} onError={() => { setFailed(true); setLoaded(false) }} />
          )}
        </div>
        {photo.caption ? <figcaption className="collage-caption">{photo.caption}</figcaption> : <div className="collage-photo-footer" aria-hidden="true"><span /><i /></div>}
      </motion.figure>
    </motion.div>
  )
}

export default function PersonalCollage() {
  const pointer = useContext(HeroPointerContext)
  const interactive = pointer?.interactive ?? false
  const region = useRef(null)
  const bounds = useRef(null)
  const active = useMotionValue(0)
  const offsetX = useTransform(() => {
    const clientX = pointer?.x.get() ?? 0
    if (!active.get() || !bounds.current || !pointer) return 0
    return Math.max(-1, Math.min(1, ((clientX - bounds.current.left) / bounds.current.width - 0.5) * 2))
  })
  const offsetY = useTransform(() => {
    const clientY = pointer?.y.get() ?? 0
    if (!active.get() || !bounds.current || !pointer) return 0
    return Math.max(-1, Math.min(1, ((clientY - bounds.current.top) / bounds.current.height - 0.5) * 2))
  })

  useEffect(() => { if (!interactive) active.set(0) }, [interactive, active])

  function enter(event) {
    if (!interactive || event.pointerType !== "mouse") return
    bounds.current = region.current.getBoundingClientRect()
    active.set(1)
  }
  function reset() { active.set(0) }

  return (
    <div ref={region} className="personal-collage" role="group" aria-label="Personal photo collage"
      onPointerEnter={enter} onPointerLeave={reset} onPointerCancel={reset}>
      <span className="collage-spark" aria-hidden="true" />
      <span className="collage-corner" aria-hidden="true" />
      {collagePhotos.slice(0, 3).map((photo, index) => (
        <CollagePhoto key={`${photo.id}-${photo.src}`} photo={photo} index={index}
          offsetX={offsetX} offsetY={offsetY} interactive={interactive} />
      ))}
    </div>
  )
}
