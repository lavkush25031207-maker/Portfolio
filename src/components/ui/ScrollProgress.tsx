import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return <div ref={ref} className={styles.progress} aria-hidden="true" />
}
