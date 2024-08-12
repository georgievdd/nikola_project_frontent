import {showAlert} from 'alert'
import {
  GET_HOUSE_RESERVATION,
  POST_MAKE_RESERVATION,
  PUT_RESERVATION_PRICE,
} from 'api/endpoints'
import {post, put, get} from 'api/instance'
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
  return put<IReservationPrice>(PUT_RESERVATION_PRICE(id), data)
}

export function postMakeReservation(
  id: number,
  data: IReservationPriceRequest,
): Promise<MakeReservationResponse | null> {
  return post<MakeReservationResponse>(POST_MAKE_RESERVATION(id), data).catch(
    (err) => {
      showAlert(
        err?.response?.data?.email?.[0] ||
          err?.response?.data?.non_field_errors[0] ||
          'Неизвестная ошибка',
      )
      return null
    },
  )
}

export function getReservation(slug: string): Promise<Reservation> {
  return get<{reservation: Reservation}>(GET_HOUSE_RESERVATION(slug)).then(
    (response) => response.reservation,
  )
}
