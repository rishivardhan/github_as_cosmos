import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const StarField = () => {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = new Float32Array(2000 * 3)
  for (let i = 0; i < 2000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1000
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={5} color="#ffffff" />
    </points>
  )
}

export default StarField