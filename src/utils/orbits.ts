export const getOrbitRadius = (index: number, total: number): number => {
  return 25 + (index / total) * 100
}

export const getOrbitSpeed = (totalCommits: number): number => {
  return 0.001 + (totalCommits / 100000) * 0.01
}