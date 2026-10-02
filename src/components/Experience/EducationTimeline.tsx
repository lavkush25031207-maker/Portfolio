import { usePortfolio } from '../../context/PortfolioContext'
import styles from './EducationTimeline.module.css'

export default function EducationTimeline() {
  const { education } = usePortfolio()
  return (
    <div className={styles['education-list']}>
      {education.map((item) => (
        <article key={item.title}>
          <span className={styles.date}>{item.date}</span>
          <h3>{item.title}</h3>
          <p>{item.organization}</p>
        </article>
      ))}
    </div>
  )
}
