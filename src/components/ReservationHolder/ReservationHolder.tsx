'use client'
import {useCallback, useEffect, useState} from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {getReservation} from 'api/reservation'
import {BillEvent} from 'components/Bill/BillEvent/BillEvent'
import Swiper from 'components/ui/Swiper/Swiper'
import {Reservation} from 'entity/Reservation'
import CircleImg from 'images/circle.svg'
import ClipImg from 'images/clip.svg'
import MoonImg from 'images/moon.svg'
import AddressIcon from 'images/svg/address'

import {
  address,
  copyReservationToBuffer,
  getClock,
  getSlug,
  prepareDate,
} from './helpers'

const css = require('src/helpers').importStyles(
  require('./ReservationHolder.module.scss'),
)

const ReservationHolder = () => {
  const [reservation, setReservstion] = useState<Reservation | null>(null)

  const onClick = () => copyReservationToBuffer(reservation!)

  const stopClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    getReservation(getSlug()).then(setReservstion)
  }, [])

  if (!reservation) {
    return <div></div>
  }
  return (
    <div className={css`container`}>
      <h1>Заявка отправлена</h1>
      <section onClick={onClick}>
        <div className={css`house`}>
          <div className={css`first-column`} onClick={stopClick}>
            <div className={css`preview`}>
              <Swiper links={[reservation.house.pictures[0]]} />
            </div>
            <a href={address.link} target="blank">
              <div className={css`address`}>
                <div className={css`address-header`}>
                  <AddressIcon />
                  <p>Адрес:</p>
                </div>
                <p className={css`address-text`}>{address.text}</p>
              </div>
            </a>
          </div>
          <div className={css`second-column`}>
            <div className={css`line`}>
              <h3>Домик:</h3>
              <h3>{reservation.house.name}</h3>
            </div>
            <div className={css`line`}>
              <h3>Заезд:</h3>
              <div>
                <h3 className={css`nowrap`}>
                  {prepareDate(reservation.check_in_datetime)}
                </h3>
                {clock(reservation.check_in_datetime, 'in')}
              </div>
            </div>
            <div className={css`line`}>
              <h3>Выезд:</h3>
              <div>
                <h3 className={css`nowrap`}>
                  {prepareDate(reservation.check_out_datetime)}
                </h3>
                {clock(reservation.check_out_datetime, 'out')}
              </div>
            </div>
            <div className={css`line`}>
              <h3>Фамилия:</h3>
              <h3 className={css`ellipsis`}>{reservation.client.first_name}</h3>
            </div>
            <div className={css`line`}>
              <h3>Имя:</h3>
              <h3 className={css`ellipsis`}>{reservation.client.last_name}</h3>
            </div>
            <div className={css`line`}>
              <h3>Почта:</h3>
              <h3 className={css`ellipsis`}>{reservation.client.email}</h3>
            </div>
            <div className={css`line`}>
              <h3>Контакт:</h3>
              <h3 className={css`ellipsis`}>{reservation.preferred_contact}</h3>
            </div>
            <div className={css`line`}>
              <h3>ID заявки:</h3>
              <h3 className={css`ellipsis`}>{reservation.slug}</h3>
            </div>
            <div className={css`line`}>
              <h3>Стоимость:</h3>
              <h3>{reservation.bill.total} ₽</h3>
            </div>
          </div>
        </div>
        <div className={css`comment`}>
          <h2 className={css`header`}>Комментарий:</h2>
          <p>{reservation.comment}</p>
        </div>
        <div className={css`detalization`}>
          <h2 className={css`header`}>Детализация по дням:</h2>
          <div className={css`events`}>
            {reservation.bill.chronological_positions.map((event, i) => (
              <BillEvent event={event} key={event.description + i} />
            ))}
            {reservation.bill.non_chronological_positions.map((event, i) => (
              <BillEvent event={event} key={event.description + i} />
            ))}
          </div>
        </div>
        <div className={css`clip`}>
          <Image src={ClipImg} width={27} height={34} alt="clip" />
        </div>
      </section>
      <div className={css`description`}>
        <h3>
          В ближайшее время с вами свяжутся для подтверждения бронирования
        </h3>
        <h3>
          Более подробную информацию о домике и нашем агентстве можно{' '}
          <Link
            href={`${window.location.origin}/house/${reservation.house.id}`}
          >
            посмотреть на сайте
          </Link>
        </h3>
      </div>
    </div>
  )
}

const clock = (time: string, type: string) => (
  <span className={css`clock`}>
    <p>{getClock(time)}</p>
    <Image
      src={type === 'in' ? CircleImg : MoonImg}
      alt="type of date"
      width={18}
      height={18}
    />
  </span>
)

export default ReservationHolder
