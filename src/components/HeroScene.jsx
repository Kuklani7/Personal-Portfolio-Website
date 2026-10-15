import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MathUtils } from "three"
import HeroFallback from "./HeroFallback"
import useTheme from "../hooks/useTheme"
import { scenePalette } from "../theme/scenePalette"

function Knot({ pointer, color }) {
  const tilt = useRef(null)
  const shape = useRef(null)
  const time = useRef(0)
  useFrame((_, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05)
    time.current += delta
    shape.current.rotation.y += delta * 0.08
    shape.current.position.y = Math.sin(time.current * 0.7) * 0.045
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, pointer.current.y * 0.16, 4, delta)
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, pointer.current.x * 0.24, 4, delta)
  })
  return (
    <group ref={tilt}>
      <mesh ref={shape} rotation={[0.45, 0.25, -0.2]}>
        <torusKnotGeometry args={[0.95, 0.25, 160, 20, 2, 3]} />
        <meshStandardMaterial color={color} metalness={0.36} roughness={0.25} />
      </mesh>
    </group>
  )
}

function ContextGuard({ onFailure }) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    const canvas = gl.domElement
    function lost(event) { event.preventDefault(); onFailure() }
    canvas.addEventListener("webglcontextlost", lost)
    return () => canvas.removeEventListener("webglcontextlost", lost)
  }, [gl, onFailure])
  return null
}

export default function HeroScene({ active, pointer, onReady, onFailure }) {
  const { theme } = useTheme()
  const palette = scenePalette[theme]
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 38 }} dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power", stencil: false }}
      frameloop={active ? "always" : "demand"} fallback={<HeroFallback />}
      onCreated={onReady} style={{ pointerEvents: "none" }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 4]} color={palette.key} intensity={3} />
      <directionalLight position={[-3, -1, 2]} color={palette.fill} intensity={1.8} />
      <pointLight position={[2, -2, -2]} color={palette.rim} intensity={12} distance={10} decay={2} />
      <Knot pointer={pointer} color={palette.material} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  )
}
