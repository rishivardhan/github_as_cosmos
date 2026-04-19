import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const StarField = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  const positions = new Float32Array(3000 * 3)
  const colors = new Float32Array(3000 * 3)
  for (let i = 0; i < 3000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    // Vary colors for depth
    const brightness = Math.random()
    colors[i * 3] = brightness
    colors[i * 3 + 1] = brightness
    colors[i * 3 + 2] = brightness * 0.8
  }

  useFrame(() => {
    if (pointsRef.current) {
      // Parallax effect
      pointsRef.current.position.copy(camera.position).multiplyScalar(-0.1)
      pointsRef.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={3000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={3} vertexColors />
    </points>
  )
}

export default StarField