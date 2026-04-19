import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BlackHole = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particlePositions = new Float32Array(100 * 3)
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * Math.PI * 2
    const radius = 2 + Math.random() * 1
    particlePositions[i * 3] = Math.cos(angle) * radius
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.02
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial color="#000000" emissive="#111111" emissiveIntensity={0.3} roughness={0.8} metalness={0.2} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ff0000" />
      </points>
    </group>
  )
}

export default BlackHole