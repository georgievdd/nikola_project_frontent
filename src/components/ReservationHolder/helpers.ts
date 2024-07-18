import { Reservation } from '@/entity/Reservation';
import { format } from 'date-fns';
import {ru} from 'date-fns/locale'; 

export function prepareDate(iso: string): string {
    return format(new Date(iso), "dd MMMM yyyy 'г.'", {
        locale: ru
    })
}

// todo 13:00 -> 01:00
export function getClock(iso: string): string {
    return format(new Date(iso), "hh:mm", {
        locale: ru
    })
}

export const getSlug = () => window.location.pathname.split('/').at(-1)!

export function copyReservationToBuffer(reservation: Reservation) {
    const data =
        `Домик: ${reservation.house.name}
Заезд: ${prepareDate(reservation.check_in_datetime)} в ${getClock(reservation.check_in_datetime)}
Выезд: ${prepareDate(reservation.check_out_datetime)} в ${getClock(reservation.check_out_datetime)}
Едет человек: ${reservation.total_persons_amount}
Итоговая стоимость в рублях: ${reservation.bill.total}
Ссылка на заявку: ${window.location.href}`
    navigator.clipboard.writeText(data)
}