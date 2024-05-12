import { CompletedReservation } from '@/entity/Reservation'
import React from 'react'



const ReservationHolder = ({reservation}: {reservation: CompletedReservation}) => {
  return (
    <div>
        {reservation.house.name}
    </div>
  )
}

export default ReservationHolder