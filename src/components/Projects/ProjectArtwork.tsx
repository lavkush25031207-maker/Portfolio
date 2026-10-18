import { useState } from 'react'
import type { Project } from '../../types/portfolio'
import styles from './ProjectArtwork.module.css'

export default function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const previewUrl = project.liveUrl

  return (
    <div className={styles.projectArt} aria-hidden="true">
      <div className={styles.browser}>
        <div className={styles.browserBar}><i /><i /><i /><span>{project.title}</span></div>
        <div className={styles.preview}>
          {/* Live website iframe preview */}
          {previewUrl && !error ? (
            <div className={styles.iframeWrap}>
              <iframe
                src={previewUrl}
                title={`${project.title} preview`}
                className={`${styles.iframe} ${loaded ? styles.iframeLoaded : ''}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
              {!loaded && (
                <div className={styles.iframeSkeleton}>
                  <div className={styles.shimmer} />
                </div>
              )}
              <div className={styles.iframeOverlay} />
            </div>
          ) : (
            /* Fallback: original styled hero preview */
            <div className={styles.fallback}>
              <span className={styles.category}>{project.heroEyebrow ?? project.category}</span>
              <strong>{project.heroTitle ?? project.title}</strong>
              {project.heroDescription && <p>{project.heroDescription}</p>}
              <div className={styles.previewFooter}>
                <span className={styles.previewAction}>{project.heroAction ?? 'Explore project'} <b>↗</b></span>
                <div className={styles.lines}><i /><i /><i /></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}
