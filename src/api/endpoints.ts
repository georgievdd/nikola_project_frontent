import { INTERNAL_API_URL } from "./instance";

// next fetch
export const FETCH_HOUSES = `${INTERNAL_API_URL}/houses/`
export const FETCH_HOUSE = (id: string) => `${INTERNAL_API_URL}/houses/${id}`
export const FETCH_HOUSE_OPTIONS = (id: string) => `${INTERNAL_API_URL}/houses/reservations/${id}/options`

// for axios
export const GET_HOUSE_CALENDAR = (id: number) => `/houses/${id}/calendar/`
export const GET_HOUSES_CALENDAR = `/houses/calendar/`
export const GET_HOUSES = `/houses/`
export const PUT_RESERVATION_PRICE = (id: number) => `houses/reservations/${id}/price/`
export const POST_MAKE_RESERVATION = (id: number) => `houses/reservations/${id}/new_reservation/`