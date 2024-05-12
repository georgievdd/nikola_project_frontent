import { CompletedReservation } from '@/entity/Reservation';
import { format } from 'date-fns';
import {ru} from 'date-fns/locale'; 

export function prepareDate(iso: string): string {
    return format(new Date(iso), "dd MMMM yyyy 'г.'", {
        locale: ru
    })
}

export function getClock(iso: string): string {
    return format(new Date(iso), "hh:mm", {
        locale: ru
    })
}

export function copyReservationToBuffer(reservation: CompletedReservation) {
    const data =
`Домик: ${reservation.house.name}
Заезд: ${prepareDate(reservation.check_in_datetime)} в ${getClock(reservation.check_in_datetime)}
Выезд: ${prepareDate(reservation.check_out_datetime)} в ${getClock(reservation.check_out_datetime)}
Едет человек: ${reservation.total_persons_amount}
Итоговая стоимость в рублях: ${reservation.total}`
    navigator.clipboard.writeText(data)
}