import { useEffect, useState } from 'react'
import { PortfolioContext } from './context/PortfolioContext'
import type { PortfolioData } from './types/portfolio'
import portfolioJson from './data/portfolio.json'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import VisitorFeedback from './components/VisitorFeedback/VisitorFeedback'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import styles from './App.module.css'

function assetUrl(path: string) {
  return /^(?:https?:|data:)/.test(path) || path.startsWith('//')
    ? path
    : import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)

  useEffect(() => {
    const data = portfolioJson as unknown as PortfolioData
    const portfolioWithAssetUrls = {
      ...data,
      profile: {
        ...data.profile,
        portrait: assetUrl(data.profile.portrait),
        resume: assetUrl(data.profile.resume),
      },
    }
    setPortfolio(portfolioWithAssetUrls)
    document.title = `${portfolioWithAssetUrls.profile.name} | ${portfolioWithAssetUrls.profile.role}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', portfolioWithAssetUrls.metadata.description)
  }, [])

  if (!portfolio) {
    return null
  }

  return (
    <PortfolioContext.Provider value={portfolio}>
      <a href="#main" className={styles.skipLink}>
        {portfolio.ui.skipLink}
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <About />
        <VisitorFeedback />
        <Contact />
      </main>
      <Footer />
    </PortfolioContext.Provider>
  )
}
