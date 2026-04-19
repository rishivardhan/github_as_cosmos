export const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#ed8b00',
  Go: '#00add8',
  Rust: '#000000',
}

export const getColor = (language: string): string => {
  return languageColors[language] || '#ffffff'
}