import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import HeroPortrait from './HeroPortrait'
import { downloadResume } from '../../utils/generateResume'
import layout from '../../styles/layout.module.css'
import styles from './Hero.module.css'

export default function Hero() {
  const portfolioData = usePortfolio()
  const { hero, profile, projects } = portfolioData
  return (
    <section id="home" tabIndex={-1} className={styles['hero']}>
      <div className={[layout['container'], styles['hero-grid']].join(' ')}>
        <div className={styles['hero-copy']}>
          <div className={styles['availability']}>
            <span className={layout['status-dot']} /> {hero.availability}
          </div>
          <h1>
            {hero.greeting}
            <br />
            <span>
              {profile.name}
              <span className={layout['accent-dot']}>.</span>
            </span>
          </h1>
          <p className={styles['hero-role']}>
            {profile.role} {hero.roleLead}
            <br className={styles['desktop-break']} /> {hero.roleEnd}
          </p>
          <p className={styles['hero-description']}>{hero.description}</p>
          <div className={styles['hero-buttons']}>
            <Button href="#projects">
              {hero.workLabel} <Icon name="arrow" size={17} />
            </Button>
            <Button variant="secondary" onClick={() => downloadResume(portfolioData)}>
              <Icon name="down" size={17} /> {hero.resumeLabel}
            </Button>
          </div>
          <div className={styles['hero-social']}>
            <a
              className={layout['icon-button']}
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.name}`}
            >
              <Icon name="mail" />
            </a>
            <a
              className={layout['icon-button']}
              href={`tel:${profile.phone}`}
              aria-label={`Call ${profile.name}`}
            >
              <Icon name="phone" />
            </a>
            <span>
              <Icon name="pin" size={16} /> {profile.location}
            </span>
          </div>
          <div className={styles['hero-facts']}>
            <div>
              <strong>{String(projects.length).padStart(2, '0')}</strong>
              <span>{hero.projectCountLabel}</span>
            </div>
          </div>
        </div>
        <HeroPortrait />
      </div>
      <a href="#about" className={styles['scroll-cue']}>
        {hero.scrollLabel} <span aria-hidden="true">&darr;</span>
      </a>
    </section>
  )
}
