import React, {MouseEventHandler, useCallback} from 'react'

import IconCircle from 'images/svg/circle'
import IconMoon from 'images/svg/moon'

import styles from './Selection.Input.module.scss'

interface Props {
  times: string[]
  value: string
  onChange: (value: string) => void
}

interface onChangeEvent {
  target: {
    parentNode: HTMLElement | SVGElement
  }
}

const SelectInput = ({times, value, onChange}: Props) => {
  const onClick = useCallback((e: onChangeEvent) => {
    let parent = e.target.parentNode
    if (parent instanceof SVGElement) {
      parent = parent.parentNode as HTMLElement
    }
    const pNode = parent.querySelector('p')!
    onChange(pNode.textContent!)
  }, [])
  return (
    <div>
      <Option
        time={value}
        className={[
          styles['option-wrapper'],
          styles['option-focus'],
          styles['current-option'],
        ].join(' ')}
      />
      <OptionList
        times={times}
        currentTime={value}
        onClick={onClick as unknown as MouseEventHandler<HTMLDivElement>}
      />
    </div>
  )
}

const getIcon = (hours: number) => {
  if (6 < hours && hours < 15) {
    return <IconCircle />
  }
  return <IconMoon />
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
    <div
      className={[
        styles.option,
        className,
        current && styles['current-option'],
      ].join(' ')}
      onClick={onClick}
      tabIndex={0}
    >
      <p>{time}</p>
      {getIcon(hours)}
    </div>
  )
}

const OptionList = ({
  times,
  currentTime,
  onClick,
}: {
  times: string[]
  currentTime: string
  onClick: MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className={styles['option-list']}>
      {times.map((time) => (
        <div key={time} className={styles['option-wrapper']}>
          <Option time={time} current={currentTime == time} onClick={onClick} />
        </div>
      ))}
    </div>
  )
}

export default SelectInput
