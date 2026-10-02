import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import layout from '../../styles/layout.module.css'
import styles from './HeroPortrait.module.css'

export default function HeroPortrait() {
  const { portrait, profile } = usePortfolio()
  return (
    <div className={styles['hero-visual']}>
      <div className={styles['portrait-halo']} />
      <div className={styles['portrait-frame']}>
        <img
          src={profile.portrait}
          alt={profile.name}
          width="960"
          height="1074"
          fetchPriority="high"
        />
      </div>
      <span className={styles['code-float']} aria-hidden="true">
        <Icon name="code" size={29} />
      </span>
      <div className={styles['hire-badge']}>
        <span className={layout['status-dot']} />
        <div>
          {portrait.availability}
          <small>{portrait.message}</small>
        </div>
      </div>
      <span className={styles['portrait-caption']}>{portrait.caption}</span>
    </div>
  )
}
