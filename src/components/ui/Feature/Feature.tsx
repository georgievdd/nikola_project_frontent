import React from 'react'
import Image from 'next/image'
import styles from './Feature.module.scss'

const Feature = ({
  name,
  icon,
  className,
}: {
  name: string,
  icon: string,
  className?: string,
}) => {
  return (
    <div className={[className, styles.container].join(' ')} style={{display: 'flex'}}>
      <Image width={17} height={17} alt='icon' src={icon}/>
      <p>{name}</p>
    </div>
  )
}

export default Feature