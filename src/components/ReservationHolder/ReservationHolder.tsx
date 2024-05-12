'use client'
import { CompletedReservation } from '@/entity/Reservation'
import styles from './ReservationHolder.module.scss'
import Swiper from '../Swiper/Swiper'
import { copyReservationToBuffer, getClock, prepareDate } from './helpers'
import CircleImg from '../../../public/images/circle.svg'
import MoonImg from '../../../public/images/moon.svg'
import Image from 'next/image'
import ClipImg from '../../../public/images/clip.svg'
import { useCallback } from 'react'

const ReservationHolder = ({reservation}: {reservation: CompletedReservation}) => {
  
  const onClick = useCallback(() => {
    copyReservationToBuffer(reservation)
  }, [])

  const stopClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])
  
  return (
    <div className={styles.container}>
      <h1>
        Заявка отправлена
      </h1>
      <section onClick={onClick}>
        <div className={styles['house-preview']} onClick={stopClick}>
          <Swiper links={reservation.house.pictures}/>
        </div>
        <div className={styles['house-description']}>
          <div className={styles['line']}>
            <h3>Домик:</h3>
            <h3>{reservation.house.name}</h3>
          </div>
          <div className={styles['line']}>
            <h3>Заезд:</h3>
            <div>
              <h3>{prepareDate(reservation.check_in_datetime)}</h3>
              {clock(reservation.check_in_datetime, 'in')}
            </div>
          </div>
          <div className={styles['line']}>
            <h3>Выезд:</h3>
            <div>
              <h3>{prepareDate(reservation.check_out_datetime)}</h3>
              {clock(reservation.check_in_datetime, 'out')}
            </div>
          </div>
          <div className={styles['line']}>
            <h3>Стоимость:</h3>
            <h3>{reservation.total} ₽</h3>
          </div>
        </div>
        <div className={styles.clip}>
          <Image
            src={ClipImg}
            width={27}
            height={34}
            alt='clip'
          />
        </div>
      </section>
      <div className={styles.description}>
        <h3>
          Информация уже была отправлена Вам на электронную почту
        </h3>
        <h3>
          В ближайшее время с вами свяжутся для подтверждения бронирования
        </h3>
        <h3>
          Номер вашей заявки: {reservation.id}
        </h3>
      </div>
    </div>
  )
}

const clock = (time: string, type: string) => (
  <span className={styles.clock}>
    <p>{getClock(time)}</p>
    <Image 
      src={type === 'in' ? CircleImg : MoonImg}
      alt='type of date'
      width={18}
      height={18}
    />
  </span>
) 

export default ReservationHolder