import Reveal from './Reveal'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = { eyebrow: string; title: string; description: string }
export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Reveal>
  )
}
