import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) 
        => void
    className?: string
    style?: Record<string, string>
    variant?: 'contained' | 'base'
}

const Button = ({
    children,
    onClick,
    className,
    style,
    variant
}: ButtonProps) => {
  variant = variant || 'base'

  return (
    <button
      className={[className, styles[variant]].join(' ')}
      onClick={onClick}
      style={style}
    >
      <p>{children}</p>
    </button>
  )
}

export default Button