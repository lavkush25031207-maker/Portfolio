import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
    } catch {
      // Theme switching remains available when browser storage is blocked.
    }
  }, [dark])

  return { dark, toggleTheme: () => setDark((value) => !value) }
}
