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

export const address = {
    text: `Деревня Никола-Ленивец, 10, сельское поселение Угорское, Дзержинский район, Калужская область`,
    link: `https://yandex.ru/maps/?ll=35.599293%2C54.748715&mode=whatshere&whatshere%5Bpoint%5D=35.599179%2C54.748626&whatshere%5Bzoom%5D=17.871925&z=17`,
}