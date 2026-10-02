import { usePortfolio } from '../../context/PortfolioContext'
import styles from './Brand.module.css'

export default function Brand({
  subtitle = false,
  onClick,
}: {
  subtitle?: boolean
  onClick?: () => void
}) {
  const { profile, navigation } = usePortfolio()
  return (
    <a
      href="#home"
      className={styles.brand}
      onClick={onClick}
      aria-label={`${profile.name} - ${navigation[0]?.label ?? 'Home'}`}
    >
      <span className={styles.mark}>
        {profile.brandMark}
        <span>.</span>
      </span>
      <span>
        {profile.name}
        {subtitle && <small>{profile.role}</small>}
      </span>
    </a>
  )
}
