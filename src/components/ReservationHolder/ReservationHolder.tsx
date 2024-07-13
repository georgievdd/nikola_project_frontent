'use client'
import { Reservation } from '@/entity/Reservation'
import styles from './ReservationHolder.module.scss'
import Swiper from '../ui/Swiper/Swiper'
import { copyReservationToBuffer, getClock, prepareDate } from './helpers'
import CircleImg from '../../../public/images/circle.svg'
import MoonImg from '../../../public/images/moon.svg'
import Image from 'next/image'
import ClipImg from '../../../public/images/clip.svg'
import { useCallback, useEffect } from 'react'
import { getReservation } from '@/api/reservation'
import AddressIcon from '../../../public/images/svg/address'
import { useValue } from '@/rhelpers'

const ReservationHolder = () => {
  
  const reservationSetter = useValue<Reservation>()
  const reservation = reservationSetter.get()

  const onClick = () =>
    copyReservationToBuffer(reservation)

  const stopClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    const slug = window.location.pathname.split('/').at(-1)
    getReservation(slug!)
      .then(reservationSetter.set)
  }, [])

  if (!reservation) {
    return <div></div>
  }
  return (
    <div className={styles.container}>
      <h1>
        Заявка отправлена
      </h1>
      <section onClick={onClick}>
        <div className={styles['first-column']} onClick={stopClick}>
          <Swiper links={reservation.house.pictures}/>
          <div className={styles['address-header']}>
            <AddressIcon />
            <p>Адрес:</p>
          </div>
        </div>
        <div className={styles['second-column']}>
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
              {clock(reservation.check_out_datetime, 'out')}
            </div>
          </div>
          <div className={styles['line']}>
            <h3>Стоимость:</h3>
            <h3>{reservation.bill.total} ₽</h3>
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
          Информация о бронировании была отправлена Вам на электронную почту
        </h3>
        <h3>
          В ближайшее время с вами свяжутся для подтверждения бронирования
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