import { useCallback, useEffect, useState } from "react"
import { IReservationPrice } from "../../dto/Reservations"
import { LabelInputController, useLabelInput } from "@/components/ui/Inputs/LabelInput/useLabelInput"
import { debounce } from "lodash"

export interface BookingInvoiceController {
    data: IReservationPrice | null
    set: (v: IReservationPrice | null) => void
    onSubmit: () => void
    promoController: LabelInputController
    promoValue: string
}


export function useBookingInvoice(): BookingInvoiceController {
    const [data, setData] = useState<IReservationPrice | null>(null)
    const promoController = useLabelInput({ label: 'Промокод', placeholder: 'ваш промокод', type: 'text'})
    const [promoValue, setPromoValue] = useState('');

    const debouncePromo = useCallback(debounce((value) => {
      setPromoValue(value);
    }, 300), []);

    useEffect(() => {
      debouncePromo(promoController.value)
    }, [promoController.value])

    return {
      data,
      set: (v: IReservationPrice | null) => setData(v),
      onSubmit: () => {},
      promoController,
      promoValue,
    }
}