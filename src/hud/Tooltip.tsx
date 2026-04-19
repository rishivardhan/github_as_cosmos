import { motion } from 'framer-motion'
import { Repo } from '../types/repo'

interface TooltipProps {
  repo: Repo | null
  mousePos: { x: number; y: number }
}

const Tooltip = ({ repo, mousePos }: TooltipProps) => {
  if (!repo) return null

  return (
    <motion.div
      className="absolute bg-gradient-to-br from-gray-800 to-black bg-opacity-90 backdrop-blur-lg p-3 rounded-lg border border-green-500/50 shadow-xl pointer-events-none z-50"
      style={{
        left: mousePos.x + 15,
        top: mousePos.y + 15,
        maxWidth: '250px'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-green-400 text-sm font-mono">
        <div className="font-bold text-white mb-1">{repo.name}</div>
        <div>Commits: {repo.totalCommits}</div>
        <div>Recent: {repo.recentCommits}</div>
        <div>Contributors: {repo.contributors}</div>
        <div>Language: {repo.language}</div>
        <div>PRs: {repo.openPRs}</div>
        <div>Location: {repo.location}</div>
        <div className="text-xs text-gray-400 mt-1">{repo.lastUpdated}</div>
      </div>
    </motion.div>
  )
}

export default Tooltip