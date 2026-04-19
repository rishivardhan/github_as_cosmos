import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GalaxyPinProps {
  position: [number, number, number]
  color: string
  label: string
}

const GalaxyPin = ({ position, color, label }: GalaxyPinProps) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Pyramid indicator */}
      <mesh>
        <coneGeometry args={[1.5, 3, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </mesh>

      {/* Rotating ring around pin */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.2, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Pulsing sphere center */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} wireframe />
      </mesh>
    </group>
  )
}

export default GalaxyPin
