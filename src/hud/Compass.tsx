import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface CompassProps {
  galaxyPositions: Record<string, [number, number, number]>
}

const Compass = ({ galaxyPositions }: CompassProps) => {
  const [displayText, setDisplayText] = useState<string>('CENTER: UK GALAXY')

  useEffect(() => {
    const interval = setInterval(() => {
      const galaxies = Object.entries(galaxyPositions).filter(([loc]) => loc !== 'UK')
      const random = galaxies[Math.floor(Math.random() * galaxies.length)]
      if (random) {
        setDisplayText(`SCAN: ${random[0].toUpperCase()} GALAXY AT ${Math.round(random[1][0])}, ${Math.round(random[1][1])}, ${Math.round(random[1][2])}`)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [galaxyPositions])

  return (
    <motion.div
      className="absolute bottom-4 right-4 bg-gradient-to-br from-gray-900 to-black bg-opacity-80 backdrop-blur-lg p-3 rounded-lg border border-yellow-400/40 text-yellow-300 font-mono text-xs max-w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-yellow-400 font-bold mb-2">NAVIGATION SYSTEM</div>
      <div className="text-green-400 text-xs mb-2">
        {displayText}
      </div>
      <div className="text-xs text-gray-400">
        Use mouse wheel to zoom | Drag to rotate | Scroll to navigate
      </div>
    </motion.div>
  )
}

export default Compass
