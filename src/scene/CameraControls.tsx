import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useImperativeHandle, forwardRef } from 'react'

export interface CameraControlsHandle {
  navigateTo: (position: [number, number, number], distance: number) => void
}

const CameraControls = forwardRef<CameraControlsHandle>((_, ref) => {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()

  useImperativeHandle(ref, () => ({
    navigateTo: (position: [number, number, number], distance: number) => {
      if (controlsRef.current) {
        // Set target to the galaxy position
        controlsRef.current.target.set(position[0], position[1], position[2])
        // Move camera to view the galaxy
        const direction = Math.sqrt(distance * distance / 3)
        camera.position.set(
          position[0] + direction,
          position[1] + direction,
          position[2] + direction
        )
        controlsRef.current.update()
      }
    }
  }))

  return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} enableRotate={true} dampingFactor={0.05} enableDamping={true} minDistance={10} maxDistance={500} />
})

CameraControls.displayName = 'CameraControls'
export default CameraControls