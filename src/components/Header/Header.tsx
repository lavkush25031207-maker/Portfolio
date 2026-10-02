import layout from '../../styles/layout.module.css'
import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { useTheme } from '../../hooks/useTheme'
import { useActiveSection } from '../../hooks/useActiveSection'
import Brand from '../ui/Brand'
import Icon from '../ui/Icon'
import styles from './Header.module.css'

export default function Header() {
  const { dark, toggleTheme } = useTheme()
  const { navigation, ui } = usePortfolio()
  const active = useActiveSection(navigation)
  const [menu, setMenu] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menu) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false)
        toggle.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenu(false)
    }
    const desktop = window.matchMedia('(min-width: 801px)')
    const onResize = () => {
      if (desktop.matches) setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      desktop.removeEventListener('change', onResize)
    }
  }, [menu])

  function navigate(id: string) {
    if (menu) {
      setMenu(false)
      document.getElementById(id)?.focus({ preventScroll: true })
    }
  }

  return (
    <header ref={header} className={styles.header}>
      <nav className={[layout.container, styles.nav].join(' ')} aria-label={ui.navigationLabel}>
        <Brand onClick={() => setMenu(false)} />
        <div id="navigation" className={`${styles.links} ${menu ? styles.open : ''}`}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={dark ? ui.lightTheme : ui.darkTheme}
          >
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
          <button
            ref={toggle}
            className={`${styles.iconButton} ${styles.menuToggle}`}
            aria-controls="navigation"
            aria-expanded={menu}
            aria-label={menu ? ui.closeMenu : ui.openMenu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  )
}
