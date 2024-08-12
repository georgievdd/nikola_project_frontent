'use client'

import {useEffect, useState} from 'react'

import {notFound} from 'next/navigation'

import {getReservation} from 'api/reservation'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import ReservationHolder from 'components/ReservationHolder/ReservationHolder'
import {Reservation} from 'entity/Reservation'

export default function ReservationId() {
  const [reservation, setReservstion] = useState<Reservation | null | Error>(
    null,
  )

  useEffect(() => {
    getReservation(getSlug()).then(setReservstion).catch(setReservstion)
  }, [])
  if (!reservation) {
    return <div></div>
  }
  if (reservation instanceof Error) {
    return notFound()
  }
  return (
    <DefaultLayout>
      <ReservationHolder reservation={reservation} />
    </DefaultLayout>
  )
}

function getSlug() {
  return location.href.split('/').at(-1)!
}
