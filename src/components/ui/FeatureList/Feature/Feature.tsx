import React from 'react'
import Image from 'next/image'
import styles from './Feature.module.scss'
import type { Feature as IFeature } from '@/entity/House'
import { getImageUrl } from '@/helpers'


const Feature = ({
  feature,
  className,
}: {
  feature: IFeature,
  className?: string,
}) => {
  return (
    <div className={[className, styles.container].join(' ')} style={{display: 'flex'}}>
      <Image width={17} height={17} alt='icon' src={feature.withoutPrefix ? 
      feature.picture :
      getImageUrl(feature.picture)}/>
      <p>{feature.name}</p>
    </div>
  )
}

export default Feature