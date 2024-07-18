'use client'
import { Reservation } from '@/entity/Reservation'
import { address, copyReservationToBuffer, getClock, getSlug, prepareDate } from './helpers'
import CircleImg from '../../../public/images/circle.svg'
import MoonImg from '../../../public/images/moon.svg'
import Image from 'next/image'
import ClipImg from '../../../public/images/clip.svg'
import { useCallback, useEffect, useState } from 'react'
import { getReservation } from '@/api/reservation'
import AddressIcon from '../../../public/images/svg/address'
import PictureWithBlur from '../ui/PictureWithBlur/PictureWithBlur'
import Swiper from '../ui/Swiper/Swiper'
const s = require('@/helpers')
  .importStyles(require('./ReservationHolder.module.scss'))



const ReservationHolder = () => {
  
  const [reservation, setReservstion] = useState<Reservation | null>(null)

  const onClick = () =>
    copyReservationToBuffer(reservation!)

  const stopClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    getReservation(getSlug())
      .then(setReservstion)
  }, [])

  if (!reservation) {
    return <div></div>
  }
  return (
    <div className={s`container`}>
      <h1>
        Заявка отправлена
      </h1>
      <section onClick={onClick}>
        <div className={s`first-column`} onClick={stopClick}>
          <div className={s`preview`}>
            <Swiper links={[reservation.house.pictures[0]]}/>
          </div>
          <a href={address.link} target='blank'><div className={s`address`}>
            <div className={s`address-header`}>
              <AddressIcon />
              <p>Адрес:</p>
            </div>
            <p className={s`address-text`}>
              {address.text}
            </p>
          </div></a>
        </div>
        <div className={s`second-column`}>
          <div className={s`line`}>
            <h3>Домик:</h3>
            <h3>{reservation.house.name}</h3>
          </div>
          <div className={s`line`}>
            <h3>Заезд:</h3>
            <div>
              <h3 className={s`nowrap`}>{prepareDate(reservation.check_in_datetime)}</h3>
              {clock(reservation.check_in_datetime, 'in')}
            </div>
          </div>
          <div className={s`line`}>
            <h3>Выезд:</h3>
            <div>
              <h3 className={s`nowrap`}>{prepareDate(reservation.check_out_datetime)}</h3>
              {clock(reservation.check_out_datetime, 'out')}
            </div>
          </div>
          <div className={s`line`}>
            <h3>Фамилия:</h3>
            <h3 className={s`ellipsis`}>{reservation.client.first_name}</h3>
          </div>
          <div className={s`line`}>
            <h3>Имя:</h3>
            <h3 className={s`ellipsis`}>{reservation.client.last_name}</h3>
          </div>
          <div className={s`line`}>
            <h3>Почта:</h3>
            <h3 className={s`ellipsis`}>{reservation.client.email}</h3>
          </div>
          <div className={s`line`}>
            <h3>Контакт:</h3>
            <h3 className={s`ellipsis`}>{reservation.preferred_contact}</h3>
          </div>
          <div className={s`line`}>
            <h3>ID заявки:</h3>
            <h3 className={s`ellipsis`}>{reservation.slug}</h3>
          </div>
          <div className={s`line`}>
            <h3>Стоимость:</h3>
            <h3>{reservation.bill.total} ₽</h3>
          </div>
        </div>
        <div className={s`clip`}>
          <Image
            src={ClipImg}
            width={27}
            height={34}
            alt='clip'
          />
        </div>
      </section>
      <div className={s`description`}>
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
  <span className={s`clock`}>
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