/**
 * разделить на несколько объектов
 */

const HOUSE = {
  LIST: '/houses',
  CALENDAR: '/houses/calendar/',
  ID_CALENDAR: (id: number) => `/houses/${id}/calendar`,
  RESERVATION: (id: number) => `/houses/${id}/new_reservation/`,
  RESERVATION_OPTIONS: (id: number) => `/houses/${id}/reservation_options/`,
  RESERVATION_PRICE: (id: number) => `/houses/${id}/reservation_price/`,
}

export default {
  HOUSE,
}