import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GalaxyGuideProps {
  galaxyPositions: Record<string, [number, number, number]>
  galaxyColors: Record<string, string>
}

const GalaxyGuide = ({ galaxyPositions, galaxyColors }: GalaxyGuideProps) => {
  const linesRef = useRef<THREE.LineSegments>(null)

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const colors: number[] = []

    // Draw lines from center to each galaxy
    Object.entries(galaxyPositions).forEach(([location, pos]) => {
      // Skip center galaxy
      if (location === 'UK') return

      const color = new THREE.Color(galaxyColors[location] || '#ffffff')

      // Line from center to galaxy
      positions.push(0, 0, 0)
      positions.push(pos[0], pos[1], pos[2])

      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
    })

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

    return geometry
  }, [galaxyPositions, galaxyColors])

  useFrame((state) => {
    if (linesRef.current) {
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ;(linesRef.current.material as THREE.LineBasicMaterial).opacity = pulse
    }
  })

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial vertexColors transparent />
    </lineSegments>
  )
}

export default GalaxyGuide
