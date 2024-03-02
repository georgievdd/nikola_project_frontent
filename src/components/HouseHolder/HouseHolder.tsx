import { House } from '@/entity/House'
import React from 'react'
import HouseDescriptionBlock from './HouseDescriptionBlock'
import styles from './HouseHolder.module.scss'

interface HouseHolderProps {
    data: House
}

const HouseHolder = ({data}: HouseHolderProps) => {
  return (
    <div className={styles.container}>
        <HouseDescriptionBlock data={data}/>
        <h1></h1>
    </div>
  )
}

export default HouseHolder