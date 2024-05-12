import { CompletedReservation, IReservationPrice, IReservationPriceRequest } from "@/entity/Reservation"
import { axiosInstance } from "../instance"
import { showAlert } from "@/helpers"
import { AxiosResponse } from "axios"
import { getHouse } from "../house"

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

export function getCompletedReservation(id: number): Promise<CompletedReservation> {
    return mockedRequest()
}

const mockedRequest = (): Promise<CompletedReservation> => getHouse('1')
    .then(d => {
        console.log(d);
        return d
    })
    .then(house => ({
        id: 1,
        house,
        client: 'client@mail.ru',
        total: 124314,
        check_in_datetime: '2024-02-12T22:18:06.119Z',
        check_out_datetime: '2024-05-12T22:18:06.119Z',
        total_persons_amount: 3,
        comment: 'qqdfwfr4fehqfo',
        preferred_contact: 'contact@mail.ru',
    }))