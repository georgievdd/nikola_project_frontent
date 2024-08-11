import {CSSProperties} from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  style?: CSSProperties
  variant?: 'contained' | 'base' | 'link'
  round0?: boolean
  disabled?: boolean
  statical?: boolean
  fontSize?: number
}

const Button = ({
  children,
  onClick,
  className,
  variant,
  round0,
  disabled,
  statical,
  style,
  fontSize,
}: ButtonProps) => {
  variant = variant || 'base'

  const fontStyle: CSSProperties = {}
  fontSize && (fontStyle.fontSize = `${fontSize}px`)

  return statical ? (
    <button
      style={style}
      className={[
        className,
        styles[variant],
        round0 ? styles.round0 : '',
        disabled ? styles.disabled : '',
      ].join(' ')}
      disabled={disabled}
    >
      <p style={fontStyle}>{children}</p>
    </button>
  ) : (
    <button
      className={[
        className,
        styles[variant],
        round0 ? styles.round0 : '',
        disabled ? styles.disabled : '',
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      <p style={fontStyle}>{children}</p>
    </button>
  )
}

export default Button
