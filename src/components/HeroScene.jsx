import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MathUtils } from "three"
import HeroFallback from "./HeroFallback"

function Knot({ pointer }) {
  const tilt = useRef(null)
  const shape = useRef(null)
  useFrame((_, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05)
    shape.current.rotation.y += delta * 0.12
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, pointer.current.y * 0.16, 4, delta)
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, pointer.current.x * 0.24, 4, delta)
  })
  return (
    <group ref={tilt}>
      <mesh ref={shape} rotation={[0.45, 0.25, -0.2]}>
        <torusKnotGeometry args={[0.95, 0.25, 160, 20, 2, 3]} />
        <meshStandardMaterial color="#448bd7" metalness={0.48} roughness={0.27} emissive="#0b2550" emissiveIntensity={0.18} />
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
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 38 }} dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power", stencil: false }}
      frameloop={active ? "always" : "never"} fallback={<HeroFallback />}
      onCreated={onReady} style={{ pointerEvents: "none" }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 4]} color="#c4e6ff" intensity={4} />
      <directionalLight position={[-3, -1, 2]} color="#2273ef" intensity={2.5} />
      <pointLight position={[2, -2, -2]} color="#22d3ee" intensity={18} distance={10} decay={2} />
      <Knot pointer={pointer} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  )
}
