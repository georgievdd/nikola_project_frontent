import { postMail } from "@/api/instance";
import {Reservation} from "@/entity/Reservation";
import {format} from 'date-fns'
import { ru } from 'date-fns/locale';

interface MailInterface {
    variables: {
        houseName: string
        checkIn: string
        checkOut: string // 12 июня в 323223
        total: number
        href: string
    }
    templateName: string,
    to: string,
    title: string,
}

const formatDate = (date: Date) => {
    return format(date, 'd MMMM HH:mm', { locale: ru });
};

export const sendMail = (reservation: Reservation) => {
    const mail: MailInterface = {
        to: reservation.client.email,
        title: 'Nikola lenivets | Бронирование домика',
        templateName: 'nikola/v1',
        variables: {
            houseName: reservation.house.name,
            checkIn: formatDate(new Date(reservation.check_in_datetime)),
            checkOut: formatDate(new Date(reservation.check_out_datetime)), // 12 июня в 323223
            total: reservation.bill.total,
            href: `https://floppa.space/reservation/${reservation.slug}`
        }
    }
    try {
        return postMail(mail)
    } catch(e) {
    }
}