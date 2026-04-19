import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GalaxyCoreProps {
  color?: string
}

const GalaxyCore = ({ color = '#ffaa00' }: GalaxyCoreProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.6} />
    </mesh>
  )
}

export default GalaxyCore