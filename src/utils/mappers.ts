import { Repo } from '../types/repo'
import { getColor } from './colors'
import { getOrbitRadius, getOrbitSpeed } from './orbits'

export type CelestialType = 'asteroid' | 'moon' | 'planet' | 'star' | 'blackHole'

export const getCelestialType = (totalCommits: number): CelestialType => {
  if (totalCommits <= 50) return 'asteroid'
  if (totalCommits <= 200) return 'moon'
  if (totalCommits <= 1000) return 'planet'
  if (totalCommits <= 5000) return 'star'
  return 'blackHole'
}

export const getRadius = (totalCommits: number): number => {
  return Math.log(totalCommits + 1) * 2.5
}

export const getGlow = (recentCommits: number): number => {
  return Math.min(recentCommits / 100, 1)
}

export const mapRepoToCelestial = (repo: Repo, index: number, total: number) => {
  const type = getCelestialType(repo.totalCommits)
  const radius = getRadius(repo.totalCommits)
  const color = getColor(repo.language)
  const glow = getGlow(repo.recentCommits)
  const orbitRadius = getOrbitRadius(index, total)
  const orbitSpeed = getOrbitSpeed(repo.totalCommits)
  return {
    ...repo,
    type,
    radius,
    color,
    glow,
    orbitRadius,
    orbitSpeed,
    position: [orbitRadius, 0, 0] as [number, number, number],
  }
}