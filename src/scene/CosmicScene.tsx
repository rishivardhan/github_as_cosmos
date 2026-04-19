import { useMemo } from 'react'
import { mockRepos } from '../data/mockRepos'
import { mapRepoToCelestial } from '../utils/mappers'
import StarField from '../components/StarField'
import GalaxyCore from '../components/GalaxyCore'
import CelestialObject from '../components/CelestialObject'
import BlackHole from '../components/BlackHole'
import GalaxyGuide from '../components/GalaxyGuide'
import GalaxyPin from '../components/GalaxyPin'
import { Repo } from '../types/repo'
import { Text } from '@react-three/drei'

interface CosmicSceneProps {
  onHover: (repo: Repo | null) => void
}

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

const CosmicScene = ({ onHover }: CosmicSceneProps) => {
  const galaxies = useMemo(() => {
    const grouped = mockRepos.reduce((acc, repo) => {
      if (!acc[repo.location]) acc[repo.location] = []
      acc[repo.location].push(repo)
      return acc
    }, {} as Record<string, Repo[]>)

    return Object.entries(grouped).map(([location, repos]) => ({
      location,
      position: galaxyPositions[location] || [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
      celestials: repos.map((repo, index) => mapRepoToCelestial(repo, index, repos.length))
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#ffffff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ffaa88" intensity={0.5} />
      <pointLight position={[0, 0, -20]} color="#88aaff" intensity={0.3} />
      <fog attach="fog" args={['#000011', 50, 1000]} />
      <StarField />
      <GalaxyGuide galaxyPositions={galaxyPositions} galaxyColors={galaxyColors} />
      {Object.entries(galaxyPositions).map(([location, pos]) => (
        <GalaxyPin
          key={`pin-${location}`}
          position={pos}
          color={galaxyColors[location] || '#ffffff'}
          label={location}
        />
      ))}
      {galaxies.map((galaxy) => (
        <group key={galaxy.location} position={galaxy.position}>
          <GalaxyCore color={galaxyColors[galaxy.location] || '#ffffff'} />
          {galaxy.celestials.map((celestial) => {
            if (celestial.type === 'blackHole') {
              return <BlackHole key={celestial.name} position={celestial.position} />
            }
            return (
              <CelestialObject
                key={celestial.name}
                repo={celestial}
                onHover={onHover}
                galaxyPosition={galaxy.position}
              />
            )
          })}
        </group>
      ))}
      {galaxies.map((galaxy) => (
        <Text
          key={`label-${galaxy.location}`}
          position={[galaxy.position[0], galaxy.position[1] + 20, galaxy.position[2]]}
          fontSize={5}
          color={galaxyColors[galaxy.location] || '#ffffff'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {galaxy.location}
        </Text>
      ))}
    </>
  )
}

export default CosmicScene