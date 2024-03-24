'use client'
import styles from './CalendarInput.module.scss'
import { CalendarController } from '../CalendarBody/hooks/useCalendar'
import { getDateOrPlug } from '../CalendarBody/helpers'
import { useEffect, useRef, useState } from 'react'
import Calendar3 from '../CalendarBody'


const Calendar = ({calendarController}: {calendarController: CalendarController}) => {

  const {
    show,
    setShow
  } = calendarController
  const check_in_date = getDateOrPlug(calendarController.selectionController.dateBegin)
  const check_out_date = getDateOrPlug(calendarController.selectionController.dateEnd)

  const wrapperRef = useRef<HTMLDivElement>(null);

  const hideCalendar = () => {
    wrapperRef.current?.classList.add(styles['calendar-hide'])
    setTimeout(() => {
      wrapperRef.current?.classList.remove(styles['calendar-hide'])
      setShow(false)
    }, 350)
  }

  useEffect(() => {
    
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        hideCalendar()
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  useEffect(() => {
    calendarController.selectionController.isActive && hideCalendar()
  }, [calendarController.selectionController.isActive])

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.divider}/>
        <div className={styles.container}>
          <div className={styles.group} onClick={() => setShow(true)}>
            <label>Заезд</label>
            <p>{check_in_date}</p>
          </div>
          <div className={styles.group} onClick={() => setShow(true)}>
            <label>Выезд</label>
            <p>{check_out_date}</p>
          </div>
        </div>
      </div>
      { show &&
        <div className={styles['calendar-start']} ref={wrapperRef}>
          <Calendar3 controller={calendarController} />
        </div>
      }
    </div>
  )
}

export default Calendar