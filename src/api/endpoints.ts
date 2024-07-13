import { INTERNAL_API_URL } from "./instance";

// next fetch
export const FETCH_HOUSES = `${INTERNAL_API_URL}/houses/`
export const FETCH_HOUSE = (id: string) => `${INTERNAL_API_URL}/houses/${id}`
export const FETCH_HOUSE_OPTIONS = (id: string) => `${INTERNAL_API_URL}/houses/${id}/reservations/options`
export const FETCH_SERVICES = `${INTERNAL_API_URL}/additional_services`

// for axios
export const GET_HOUSE_CALENDAR = (id: number) => `/houses/${id}/calendar/`
export const GET_HOUSES_CALENDAR = `/houses/calendar/`
export const GET_HOUSES = `/houses/`
export const PUT_RESERVATION_PRICE = (id: number) => `/houses/${id}/reservations/price/`
export const POST_MAKE_RESERVATION = (id: number) => `/houses/${id}/reservations/`
export const GET_HOUSE_RESERVATION = (slug: string) => `/houses/reservations/by_slug/?slug=${slug}`