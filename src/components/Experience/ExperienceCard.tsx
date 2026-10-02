import type { Experience } from '../../types/portfolio'
import Tags from '../ui/Tags'

import styles from './ExperienceCard.module.css'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className={styles['experience-card']}>
      <div className={styles['card-top']}>
        <span className={styles['small-label']}>{experience.category}</span>
        <span className={styles['date']}>{experience.date}</span>
      </div>
      <h3>{experience.title}</h3>
      <div className={styles['organization']}>
        {experience.website ? (
          <a href={experience.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {experience.organization}
          </a>
        ) : (
          <span>{experience.organization}</span>
        )}
      </div>
      {experience.address && (
        <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1rem', marginTop: '-0.5rem' }}>
          {experience.address}
        </p>
      )}
      <ul>
        {experience.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <Tags items={experience.tags} />
    </article>
  )
}
