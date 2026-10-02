import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import styles from './Reveal.module.css'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/** Animate once on entry; keep content visible if motion or observers are unavailable. */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || motion.matches || !('IntersectionObserver' in window)) return
    // In-page navigation should never land on an invisible heading.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return
    element.dataset.reveal = 'pending'
    const show = () => {
      element.dataset.reveal = 'visible'
      observer.disconnect()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show()
      },
      { threshold: 0.08, rootMargin: '0px 0px -35px 0px' },
    )
    const onMotionChange = () => {
      if (motion.matches) show()
    }
    observer.observe(element)
    motion.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onMotionChange)
      delete element.dataset.reveal
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
