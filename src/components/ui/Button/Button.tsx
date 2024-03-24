import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) 
        => void
    className?: string
    style?: Record<string, string>
    variant?: 'contained' | 'base'
    round0?: boolean
    muted?: boolean,
}

const Button = ({
    children,
    onClick,
    className,
    variant,
    round0,
    muted,
}: ButtonProps) => {
  variant = variant || 'base'

  return (
    <button
      className={[
        className, 
        styles[variant],
        round0 ? (styles.round0) : '',
        muted ? styles.muted : '',
      ].join(' ')}
      onClick={onClick}
      disabled={muted}
    >
      <p>{children}</p>
    </button>
  )
}

export default Button