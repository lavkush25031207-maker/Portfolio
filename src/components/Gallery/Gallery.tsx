import { usePortfolio } from '../../context/PortfolioContext'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import layout from '../../styles/layout.module.css'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { sections, gallery } = usePortfolio()

  if (!gallery || gallery.length === 0) return null

  return (
    <section id="gallery" tabIndex={-1} className={layout['section']}>
      <div className={layout['container']}>
        <SectionHeading
          eyebrow={sections.gallery.eyebrow}
          title={sections.gallery.title}
          description={sections.gallery.description}
        />
        <div className={styles.grid}>
          {gallery.map((item, index) => (
            <Reveal key={item.id} delay={index * 130}>
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
                  <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                      <span className={styles.category}>{item.category}</span>
                      <h3 className={styles.title}>{item.title}</h3>
                      <p className={styles.description}>{item.description}</p>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
