import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'

import layout from '../../styles/layout.module.css'
import styles from './About.module.css'

export default function About() {
  const { about } = usePortfolio()
  return (
    <section id="about" tabIndex={-1} className={layout['section']}>
      <div className={[layout['container'], styles['about-grid']].join(' ')}>
        <Reveal>
          <div>
            <span className={layout['eyebrow']}>{about.eyebrow}</span>
            <h2>
              {about.titleLead}
              <br />
              {about.titleEnd}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className={styles['about-copy']}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles['about-tags']}>
              {about.traits.map((trait) => (
                <span key={trait}>
                  <Icon name="check" size={16} /> {trait}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
