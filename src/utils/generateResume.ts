import type { PortfolioData } from '../types/portfolio'

export function downloadResume(data: PortfolioData) {
  const link = document.createElement('a')
  link.href = data.profile.resume
  link.download = 'Lavkush_Maurya_Resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
