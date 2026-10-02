import styles from './Tags.module.css'

export default function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.tags}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}
