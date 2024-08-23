import {
  GET_HOUSE_RESERVATION,
  POST_MAKE_RESERVATION,
  PUT_RESERVATION_PRICE,
} from 'api/endpoints'
import {axiosInstance} from 'api/instance'
import {
  IReservationPrice,
  IReservationPriceRequest,
  MakeReservationResponse,
  Reservation,
} from 'entity/Reservation'

export function getReservationPrice(
  id: number,
  data: IReservationPriceRequest,
): Promise<IReservationPrice> {
  return axiosInstance
    .put<IReservationPrice>(PUT_RESERVATION_PRICE(id), data)
    .then((r) => r.data)
}

export function postMakeReservation(
  id: number,
  data: IReservationPriceRequest,
): Promise<MakeReservationResponse | null> {
  return axiosInstance
    .post<MakeReservationResponse>(POST_MAKE_RESERVATION(id), data)
    .then((r) => r.data)
}

export function getReservation(slug: string): Promise<Reservation> {
  return axiosInstance
    .get<{reservation: Reservation}>(GET_HOUSE_RESERVATION(slug))
    .then((r) => r.data)
    .then((response) => response.reservation)
}
