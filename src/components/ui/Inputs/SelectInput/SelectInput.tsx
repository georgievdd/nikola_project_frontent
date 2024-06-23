import React, { MouseEventHandler, MouseEvent, useCallback } from 'react'
import IconCircle from '../../../../../public/images/svg/circle'
import IconMoon from '../../../../../public/images/svg/moon'
import styles from './Selection.Input.module.scss'

interface Props {
  times: string[]
  value: string
  onChange: (value: string) => void
}

const SelectInput = ({
  times,
  value,
  onChange,
}: Props) => {
  const onClick = useCallback((e: unknown) => {
    onChange((e as {target: {textContent: string}}).target.textContent);
  }, [])
  return (
    <div>
      <Option time={value} className={[
        styles['option-wrapper'],
        styles['option-focus'],
        styles['current-option'],
      ].join(' ')}/>
      <OptionList times={times} currentTime={value} onClick={onClick}/>
    </div>
  )
}

const getIcon = (hours: number) => {
  if (6 < hours && hours < 15) {
    return <IconCircle/>
  }
  return <IconMoon/>
}

const Option = ({
  time,
  className,
  onClick,
  current,
}: {
  time: string
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  current?: boolean
}) => {
  const hours = +time.split(':')[0]
  return (
    <div className={[
      styles.option,
      className,
      current && styles['current-option']].join(' ')}
      onClick={onClick}
      tabIndex={0}>
      <p>{time}</p>
      {getIcon(hours)}
    </div>
  )
}

const OptionList = ({
  times,
  currentTime,
  onClick}: {
    times: string[],
    currentTime: string,
    onClick: MouseEventHandler<HTMLDivElement>
  }) => {
  return (
    <div className={styles['option-list']}>
      {times.map(time => (
        <div key={time} className={styles['option-wrapper']}>
          <Option time={time} current={currentTime == time} onClick={onClick}/>
        </div>
      ))}
    </div>
  )
}


export default SelectInput