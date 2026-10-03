import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ContactForm from './ContactForm'
import layout from '../../styles/layout.module.css'
import styles from './Contact.module.css'

export default function Contact() {
  const { contact, sections, profile, socialLinks } = usePortfolio()
  return (
    <section id="contact" tabIndex={-1} className={layout['section']}>
      <div className={layout['container']}>
        <SectionHeading {...sections.contact} />
        <div className={styles['contact-grid']}>
          <Reveal>
            <div className={styles['contact-info']}>
              <h3>{contact.title}</h3>
              <p>{contact.description}</p>
              <a className={styles['contact-item']} href={`mailto:${profile.email}`}>
                <span className={layout['tile-icon']}>
                  <Icon name="mail" />
                </span>
                <span>
                  <small>{contact.emailLabel}</small>
                  {profile.email}
                </span>
                <Icon name="arrow" size={18} />
              </a>
              <a className={styles['contact-item']} href={`tel:${profile.phone}`}>
                <span className={layout['tile-icon']}>
                  <Icon name="phone" />
                </span>
                <span>
                  <small>{contact.phoneLabel}</small>
                  {profile.displayPhone}
                </span>
                <Icon name="arrow" size={18} />
              </a>
              <div className={styles['contact-item']}>
                <span className={layout['tile-icon']}>
                  <Icon name="pin" />
                </span>
                <span>
                  <small>{contact.locationLabel}</small>
                  {profile.location}
                </span>
              </div>
              <div className={styles['language-note']}>{contact.languages}</div>
              <div className={styles['social-links']} aria-label="Social links">
                {socialLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.label)).map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
