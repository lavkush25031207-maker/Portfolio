import { usePortfolio } from '../../context/PortfolioContext'
import layout from '../../styles/layout.module.css'
import Brand from '../ui/Brand'
import Icon from '../ui/Icon'
import VisitorCounter from '../VisitorCounter/VisitorCounter'
import styles from './Footer.module.css'

const year = new Date().getFullYear()
export default function Footer() {
  const { profile, footer } = usePortfolio()
  return (
    <footer className={styles.footer}>
      <div className={[layout.container, styles.inner].join(' ')}>
        <Brand subtitle />
        <div className={styles.meta}>
          <p>
            &copy; {year} {profile.name}. {footer.credit}
          </p>
          <VisitorCounter />
        </div>
        <a href="#home" className={styles.backTop}>
          {footer.backTop} <Icon name="arrow" size={16} />
        </a>
      </div>
    </footer>
  )
}
