import { useState } from 'react'
import { Repo } from '../types/repo'

export const useSelection = () => {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
  return { selectedRepo, setSelectedRepo }
}