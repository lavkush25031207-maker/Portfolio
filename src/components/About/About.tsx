import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import EducationTimeline from '../Experience/EducationTimeline'

import layout from '../../styles/layout.module.css'
import styles from './About.module.css'

export default function About() {
  const { about, profile } = usePortfolio()
  return (
    <section id="about" tabIndex={-1} className={layout['section']}>
      <div className={[layout['container'], styles['about-grid']].join(' ')}>
        <Reveal>
          <div className={styles['about-intro']}>
            <span className={layout['eyebrow']}>{about.eyebrow}</span>
            <h2>
              {about.titleLead}
              <br />
              {about.titleEnd}
            </h2>
            <div className={styles['profile-card']}>
              <span className={styles['availability']}><i /> Available for new opportunities</span>
              <div>
                <span>Based in</span>
                <strong>{profile.location}</strong>
              </div>
              <div>
                <span>Focused on</span>
                <strong>{profile.role}</strong>
              </div>
            </div>
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
            <div className={styles.education}>
              <h3>Education</h3>
              <EducationTimeline />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
