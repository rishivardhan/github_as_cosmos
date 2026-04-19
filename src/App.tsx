import { Canvas } from '@react-three/fiber'
import { useSelection } from './hooks/useSelection'
import { useState, useRef } from 'react'
import CosmicScene from './scene/CosmicScene'
import CockpitHUD from './hud/CockpitHUD'
import TargetingReticle from './hud/TargetingReticle'
import CameraControls, { CameraControlsHandle } from './scene/CameraControls'
import Tooltip from './hud/Tooltip'
import Compass from './hud/Compass'
import Minimap from './hud/Minimap'

const galaxyPositions: Record<string, [number, number, number]> = {
  'UK': [0, 0, 0],
  'US': [120, 0, 0],
  'China': [0, 0, 120],
  'Germany': [-120, 0, 0],
  'France': [0, 120, 0],
  'Spain': [0, -120, 0],
  'Japan': [0, 0, -120],
  'Finland': [80, 80, 80],
  'Czech Republic': [-80, 80, 0],
  'Canada': [80, -80, 0],
  'Denmark': [0, 80, 80],
  'Netherlands': [-80, 0, 80],
  'Norway': [80, 0, -80],
}

const galaxyColors: Record<string, string> = {
  'UK': '#ffff00',
  'US': '#0000ff',
  'China': '#ff0000',
  'Germany': '#00ff00',
  'France': '#ff00ff',
  'Spain': '#00ffff',
  'Japan': '#ffa500',
  'Finland': '#800080',
  'Czech Republic': '#ff4500',
  'Canada': '#00ff7f',
  'Denmark': '#daa520',
  'Netherlands': '#dc143c',
  'Norway': '#8a2be2',
}

function App() {
  const { selectedRepo, setSelectedRepo } = useSelection()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cameraControlsRef = useRef<CameraControlsHandle>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleGalaxyClick = (location: string, position: [number, number, number]) => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.navigateTo(position, 150)
    }
  }

  return (
    <div className="w-full h-screen bg-black relative cursor-crosshair" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <CameraControls ref={cameraControlsRef} />
        <CosmicScene onHover={setSelectedRepo} />
      </Canvas>
      <CockpitHUD selectedRepo={selectedRepo} />
      <TargetingReticle />
      <Tooltip repo={selectedRepo} mousePos={mousePos} />
      <Compass galaxyPositions={galaxyPositions} />
      <Minimap galaxyPositions={galaxyPositions} galaxyColors={galaxyColors} onGalaxyClick={handleGalaxyClick} />
    </div>
  )
}

export default App