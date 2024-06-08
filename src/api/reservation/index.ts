import { IReservationPrice, IReservationPriceRequest, MakeReservationResponse, Reservation } from "@/entity/Reservation"
import { axiosInstance } from "../instance"
import { showAlert } from "@/helpers"
import { AxiosResponse } from "axios"
import { GET_HOUSE_RESERVATION, POST_MAKE_RESERVATION, PUT_RESERVATION_PRICE } from "../endpoints"

export function getReservationPrice(id: number, data: IReservationPriceRequest): Promise<AxiosResponse<IReservationPrice>> {
    return axiosInstance.put<IReservationPrice>(PUT_RESERVATION_PRICE(id), data)
}

export function postMakeReservation(id: number, data: IReservationPriceRequest): Promise<MakeReservationResponse | null> {
    return axiosInstance.post<MakeReservationResponse>(POST_MAKE_RESERVATION(id), data)
        .then(response => response.data)
        .catch(err => {
            console.log(err);
            showAlert(
                err?.response?.data?.email?.[0] || 
                err?.response?.data?.non_field_errors[0] ||
                'Неизвестная ошибка')
            return null
        })
}

export function getReservation(slug: string): Promise<Reservation> {
    return axiosInstance.get<{reservation: Reservation}>(GET_HOUSE_RESERVATION(slug))
        .then(response => response.data.reservation)
}
