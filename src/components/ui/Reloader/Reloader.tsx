import React, { CSSProperties, useRef } from 'react'
import Image from 'next/image'
import RoundArrowImg from '../../../../public/images/round-arrow.svg'
import CircleImg from '../../../../public/images/black-circle.svg'
import styles from './Reloader.module.scss'

const Reloader = ({
  onClick,
  style,
  className,
}: {
  onClick: () => void,
  style?: CSSProperties,
  className?: string,
}) => {

  const ref = useRef<HTMLImageElement>(null)
  const click = (e: any) => {
    e.preventDefault()
    onClick()
    ref.current!.classList.add(styles.rotate)
    setTimeout(() => ref.current!.classList.remove(styles.rotate), 250)
  }

  return (
    <button onClick={click} className={[styles.container, className].join(' ')} style={style}>
      <Image src={RoundArrowImg} width={20} height={20} alt='' ref={ref}/>
      <Image className={styles.imgc} src={CircleImg} width={32} height={32} alt=''/>
    </button>
  )
}

export default Reloader