import React from 'react'

import Image from 'next/image'

import type {Feature as IFeature} from 'entity/House'
import {getImageUrl} from 'src/helpers'

import styles from './Feature.module.scss'

const Feature = ({
  feature,
  className,
}: {
  feature: IFeature
  className?: string
}) => {
  return (
    <div
      className={[className, styles.container].join(' ')}
      style={{display: 'flex'}}
    >
      <Image
        quality={100}
        width={17}
        height={17}
        alt="icon"
        src={
          feature.withoutPrefix ? feature.picture : getImageUrl(feature.picture)
        }
      />
      <p>{feature.name}</p>
    </div>
  )
}

export default Feature
