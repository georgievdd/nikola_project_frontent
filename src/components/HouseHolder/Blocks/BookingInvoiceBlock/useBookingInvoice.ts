import { useState } from "react"
import { IReservationPrice } from "../../dto/Reservations"

export interface BookingInvoiceController {
    data: IReservationPrice | null,
    set: (v: IReservationPrice | null) => void,
    onSubmit: () => void,
}


export function useBookingInvoice(): BookingInvoiceController {
    const [data, setData] = useState<IReservationPrice | null>(null)
    const onSubmit = () => {

    }
    return {
      data,
      set: (v: IReservationPrice | null) => setData(v),
      onSubmit
    }
}