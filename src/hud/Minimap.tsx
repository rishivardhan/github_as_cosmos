import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface MinimapProps {
  galaxyPositions: Record<string, [number, number, number]>
  galaxyColors: Record<string, string>
  onGalaxyClick: (location: string, position: [number, number, number]) => void
}

const Minimap = ({ galaxyPositions, galaxyColors, onGalaxyClick }: MinimapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const scale = 0.3

    // Clear canvas
    ctx.fillStyle = '#000011'
    ctx.fillRect(0, 0, width, height)

    // Draw border
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = '#00330033'
    ctx.lineWidth = 0.5
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    const centerX = width / 2
    const centerY = height / 2

    // Draw galaxies
    Object.entries(galaxyPositions).forEach(([location, pos]) => {
      const x = centerX + pos[0] * scale
      const y = centerY + pos[2] * scale

      // Draw connecting line from center
      if (location !== 'UK') {
        ctx.strokeStyle = galaxyColors[location] || '#ffffff'
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Draw galaxy dot
      const radius = location === 'UK' ? 6 : 4
      ctx.fillStyle = galaxyColors[location] || '#ffffff'
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw glow
      ctx.strokeStyle = galaxyColors[location] || '#ffffff'
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.5
      ctx.beginPath()
      ctx.arc(x, y, radius + 2, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1

      // Draw label
      ctx.fillStyle = galaxyColors[location] || '#ffffff'
      ctx.font = 'bold 10px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(location.substring(0, 3).toUpperCase(), x, y + radius + 12)
    })

    // Draw center indicator
    ctx.fillStyle = '#ffff0088'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 2, 0, Math.PI * 2)
    ctx.fill()
  }, [galaxyPositions, galaxyColors])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const width = canvas.width
    const height = canvas.height
    const scale = 0.3
    const centerX = width / 2
    const centerY = height / 2

    // Check which galaxy was clicked
    Object.entries(galaxyPositions).forEach(([location, pos]) => {
      const galaxyX = centerX + pos[0] * scale
      const galaxyY = centerY + pos[2] * scale
      const distance = Math.sqrt((x - galaxyX) ** 2 + (y - galaxyY) ** 2)

      if (distance < 10) {
        onGalaxyClick(location, pos)
      }
    })
  }

  return (
    <motion.div
      className="absolute bottom-4 right-4 bg-gradient-to-br from-black to-gray-900 bg-opacity-90 backdrop-blur-lg p-2 rounded-lg border-2 border-green-500/50 shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-green-400 text-xs font-mono mb-1 text-center">STAR MAP</div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="rounded border border-green-500/30 cursor-pointer"
        onClick={handleCanvasClick}
      />
      <div className="text-green-400 text-xs font-mono mt-1 text-center">CLICK TO NAVIGATE</div>
    </motion.div>
  )
}

export default Minimap
