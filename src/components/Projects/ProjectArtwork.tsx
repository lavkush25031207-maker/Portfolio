import type { Project } from '../../types/portfolio'
import styles from './ProjectArtwork.module.css'

export default function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  return (
    <div className={styles.projectArt} aria-hidden="true">
      <div className={styles.browser}>
        <div className={styles.browserBar}><i /><i /><i /><span>{project.title}</span></div>
        <div className={styles.preview}>
          <span className={styles.category}>{project.category}</span>
          <strong>{project.title}</strong>
          <div className={styles.lines}><i /><i /><i /></div>
        </div>
      </div>
      <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}
