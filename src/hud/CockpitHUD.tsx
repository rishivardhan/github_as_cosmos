import { motion } from 'framer-motion'
import { Repo } from '../types/repo'

interface CockpitHUDProps {
  selectedRepo: Repo | null
}

const CockpitHUD = ({ selectedRepo }: CockpitHUDProps) => {
  return (
    <motion.div
      className="absolute top-4 left-4 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80 backdrop-blur-2xl p-6 rounded-2xl border border-cyan-400/20 shadow-2xl min-w-[320px]"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: selectedRepo ? 1 : 0, scale: selectedRepo ? 1 : 0.8, y: selectedRepo ? 0 : -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {selectedRepo && (
        <div className="text-center text-white">
          <motion.h2
            className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {selectedRepo.name}
          </motion.h2>
          <div className="space-y-2 text-sm">
            <motion.p
              className="flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-cyan-300 font-medium">Commits:</span>
              <span className="text-white">{selectedRepo.totalCommits.toLocaleString()}</span>
            </motion.p>
            <motion.p
              className="flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-green-300 font-medium">Recent:</span>
              <span className="text-white">{selectedRepo.recentCommits}</span>
            </motion.p>
            <motion.p
              className="flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-yellow-300 font-medium">Contributors:</span>
              <span className="text-white">{selectedRepo.contributors}</span>
            </motion.p>
            <motion.p
              className="flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-purple-300 font-medium">Language:</span>
              <span className="text-white">{selectedRepo.language}</span>
            </motion.p>
            <motion.p
              className="flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-pink-300 font-medium">PRs:</span>
              <span className="text-white">{selectedRepo.openPRs}</span>
            </motion.p>
            <motion.p
              className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-600/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {selectedRepo.lastUpdated}
            </motion.p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default CockpitHUD