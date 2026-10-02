import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
  variant?: Variant
}
export default function Button(props: LinkProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { variant = 'primary', className = '', ...rest } = props
    return <a {...rest} className={`${styles.button} ${styles[variant]} ${className}`} />
  }
  const { variant = 'primary', className = '', ...rest } = props
  return (
    <button
      type="button"
      {...rest}
      className={`${styles.button} ${styles[variant]} ${className}`}
    />
  )
}
