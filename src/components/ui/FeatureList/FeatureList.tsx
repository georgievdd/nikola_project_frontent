import {CSSProperties} from 'react'

import type {Feature as IFuture} from 'entity/House'

import Feature from './Feature/Feature'
import styles from './FeatureList.module.scss'

interface Props {
  features: IFuture[]
  style?: CSSProperties
  className?: string
  limit?: number
}

const FeatureList = ({features, limit, className, ...props}: Props) => {
  limit = limit || 1000000
  return (
    <div {...props} className={className || styles.container}>
      {features.length > limit ? (
        <>
          {features.slice(0, limit - 1).map((feature) => (
            <Feature key={feature.id} feature={feature} />
          ))}
          <div className={styles.another}>
            <p>и еще {features.length - 3}</p>
          </div>
        </>
      ) : (
        features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))
      )}
    </div>
  )
}

export default FeatureList
