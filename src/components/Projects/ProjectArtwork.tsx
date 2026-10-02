import type { Project } from '../../types/portfolio'
import styles from './ProjectArtwork.module.css'

export default function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  return (
    <div className={styles['project-art']} aria-hidden="true">
      <img className={styles['project-image']} src={project.image} alt="" loading="lazy" />
      <span className={styles['image-label']}>{project.category}</span>
      <span className={styles['project-number']}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}
