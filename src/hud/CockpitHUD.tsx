import { motion } from 'framer-motion'
import { Repo } from '../types/repo'

interface CockpitHUDProps {
  selectedRepo: Repo | null
}

const CockpitHUD = ({ selectedRepo }: CockpitHUDProps) => {
  return (
    <motion.div
      className="absolute top-4 left-4 bg-gradient-to-br from-black via-gray-900 to-black bg-opacity-70 backdrop-blur-xl p-6 rounded-full border border-cyan-500/30 shadow-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: selectedRepo ? 1 : 0, scale: selectedRepo ? 1 : 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {selectedRepo && (
        <div className="text-center text-white min-w-[280px]">
          <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {selectedRepo.name}
          </h2>
          <div className="space-y-1 text-sm">
            <p><span className="text-cyan-300">Commits:</span> {selectedRepo.totalCommits}</p>
            <p><span className="text-green-300">Recent:</span> {selectedRepo.recentCommits}</p>
            <p><span className="text-yellow-300">Contributors:</span> {selectedRepo.contributors}</p>
            <p><span className="text-purple-300">Language:</span> {selectedRepo.language}</p>
            <p><span className="text-pink-300">PRs:</span> {selectedRepo.openPRs}</p>
            <p className="text-xs text-gray-400 mt-2">{selectedRepo.lastUpdated}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default CockpitHUD