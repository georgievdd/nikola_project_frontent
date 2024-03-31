import { useState } from "react"
import { IReservationPrice } from "../../dto/Reservations"
import { LabelInputController, useLabelInput } from "@/components/ui/Inputs/LabelInput/useLabelInput"

export interface BookingInvoiceController {
    data: IReservationPrice | null
    set: (v: IReservationPrice | null) => void
    onSubmit: () => void
    promo: LabelInputController
}


export function useBookingInvoice(): BookingInvoiceController {
    const [data, setData] = useState<IReservationPrice | null>(null)
    const promo = useLabelInput({ label: 'Промокод', placeholder: 'ваш промокод', type: 'password'})
    const onSubmit = () => {

    }
    return {
      data,
      set: (v: IReservationPrice | null) => setData(v),
      onSubmit,
      promo
    }
}