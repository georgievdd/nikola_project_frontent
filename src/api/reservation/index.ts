import { IReservationPrice, IReservationPriceRequest } from "@/components/HouseHolder/dto/Reservations"
import { axiosInstance } from "../instance"
import { showAlert } from "@/helpers"
import { AxiosResponse } from "axios"

export function getReservationPrice(id: number, data: IReservationPriceRequest): Promise<AxiosResponse<IReservationPrice>> {
    return axiosInstance.put<IReservationPrice>(`houses/reservations/${id}/price/`, data)
}

export function postMakeReservation(id: number, data: IReservationPriceRequest) {
    return axiosInstance.post<IReservationPrice>(`houses/reservations/${id}/new_reservation/`, data)
    .catch(err => {
        console.log(err);
        showAlert(
            err?.response?.data?.email?.[0] || 
            err?.response?.data?.non_field_errors[0] ||
            'Неизвестная ошибка')
        return null
    })
}