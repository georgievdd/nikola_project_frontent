import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) 
        => void
    className?: string
    style?: Record<string, string>
    variant?: 'contained' | 'base' | 'link'
    round0?: boolean
    disabled?: boolean
    statical?: boolean
}

const Button = ({
    children,
    onClick,
    className,
    variant,
    round0,
    disabled,
    statical,
}: ButtonProps) => {
  variant = variant || 'base'

  return statical ? (
    <button
      className={[
        className, 
        styles[variant],
        round0 ? (styles.round0) : '',
        disabled ? styles.disabled : '',
      ].join(' ')}
      disabled={disabled}
    >
      <p>{children}</p>
    </button>
  )
  :
  (
    <button
      className={[
        className, 
        styles[variant],
        round0 ? (styles.round0) : '',
        disabled ? styles.disabled : '',
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      <p>{children}</p>
    </button>
  )
}

export default Button