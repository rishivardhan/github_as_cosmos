import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Repo } from '../types/repo'

interface CelestialObjectProps {
  repo: Repo & {
    type: string
    radius: number
    color: string
    glow: number
    orbitRadius: number
    orbitSpeed: number
    position: [number, number, number]
  }
  onHover: (repo: Repo | null) => void
  galaxyPosition: [number, number, number]
}

const Moon = ({ positionRef, index, total }: { positionRef: React.MutableRefObject<[number, number, number]>, index: number, total: number }) => {
  const moonRef = useRef<THREE.Mesh>(null)
  const moonOrbitRadius = 2 + index * 0.5
  const moonSpeed = 0.02 + index * 0.005
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (moonRef.current) {
      const angle = initialAngle + state.clock.elapsedTime * moonSpeed
      const parentPos = positionRef.current
      moonRef.current.position.set(
        parentPos[0] + Math.cos(angle) * moonOrbitRadius,
        parentPos[1] + Math.sin(angle * 2) * 0.2,
        parentPos[2] + Math.sin(angle) * moonOrbitRadius
      )
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#c0c0c0" emissive="#404040" emissiveIntensity={0.2} />
    </mesh>
  )
}

const CelestialObject = ({ repo, onHover, galaxyPosition }: CelestialObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const positionRef = useRef<[number, number, number]>([0, 0, 0])
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (meshRef.current) {
      const angle = initialAngle + state.clock.elapsedTime * repo.orbitSpeed
      const newPos: [number, number, number] = [Math.cos(angle) * repo.orbitRadius, 0, Math.sin(angle) * repo.orbitRadius]
      meshRef.current.position.set(...newPos)
      positionRef.current = newPos
    }
  })

  const moons = useMemo(() => {
    if (repo.type === 'planet' || repo.type === 'star') {
      return Array.from({ length: repo.openPRs }, (_, i) => i)
    }
    return []
  }, [repo.type, repo.openPRs])

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(repo)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[repo.radius, 64, 64]} />
        <meshStandardMaterial
          color={repo.color}
          emissive={repo.color}
          emissiveIntensity={repo.glow}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      {moons.map((_, index) => (
        <Moon key={index} positionRef={positionRef} index={index} total={moons.length} />
      ))}
    </group>
  )
}

export default CelestialObject