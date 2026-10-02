import { createContext, useContext } from 'react'
import type { PortfolioData } from '../types/portfolio'

export const PortfolioContext = createContext<PortfolioData | null>(null)

export function usePortfolio() {
  const portfolio = useContext(PortfolioContext)
  if (!portfolio) throw new Error('Portfolio content is not available')
  return portfolio
}
