import { motion } from 'framer-motion'

const TargetingReticle = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="w-12 h-12 border-2 border-cyan-400 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-6 h-6 border border-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}

export default TargetingReticle