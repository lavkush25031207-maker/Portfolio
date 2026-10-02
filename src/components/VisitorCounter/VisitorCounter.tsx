import { useState } from 'react'
import styles from './VisitorCounter.module.css'

export default function VisitorCounter() {
  const [cacheBust] = useState(() => Date.now())

  return (
    <div className={styles.counter}>
      <img
        src={`https://hits.sh/lavkush-portfolio-site.html.svg?style=flat&label=Visitors&color=2563eb&labelColor=0f172a&_=${cacheBust}`}
        alt="Visitor count"
        style={{ height: '22px', borderRadius: '4px' }}
        loading="eager"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
