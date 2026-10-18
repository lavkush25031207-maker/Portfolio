import { usePortfolio } from '../../context/PortfolioContext'
import styles from './HeroPortrait.module.css'

export default function HeroPortrait() {
  const { profile } = usePortfolio()
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
    </div>
  )
}
