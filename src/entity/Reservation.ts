import {House} from 'entity/House'

export interface IReservationOptions {
  base_persons_amount: number
  total_persons_amount: number
  price_per_extra_person: IReservationOptionsTimes
  check_out_times: IReservationOptionsTimes
  check_in_times: IReservationOptionsTimes
}

export interface IReservationOptionsTimes {
  default: string
  earliest: string
  latest: string
  '12:00': number
  '15:00': number
}

export interface IReservationPriceRequest {
  check_in_datetime: string
  check_out_datetime: string
  total_persons_amount: number
  promo_code?: string
}

export interface IReservationPrice {
  reservation: {
    house: House
    client: null
    bill: Bill
    check_in_datetime: string // ISO
    check_out_datetime: string // ISO
    total_persons_amount: number
    preferred_contact: string
    comment: string
  }
}

export interface MakeReservationResponse {
  slug: string
}

export interface Bill {
  total: number
  chronological_positions: ChronologicalPosition[]
  non_chronological_positions: NonChronologicalPosition[]
  promo_code?: string
}

export interface ChronologicalPosition {
  type: string
  price: number
  description: string
  end_date: string
  start_date: string
}

export interface NonChronologicalPosition {
  type: string
  extra_persons_amount?: number
  price_per_extra_person?: number
  nights_amount?: number
  price: number
  description: string
  promo_code?: string
}

export interface MakeReservationRequest {
  check_in_datetime: string
  check_out_datetime: string
  total_persons_amount: number
  email: string
  first_name: string
  last_name: string
  preferred_contact: string
  comment?: string
  promo_code?: string
}

interface Client {
  email: string
  first_name: string
  last_name: string
}

export interface Reservation {
  slug: string
  house: House
  client: Client
  check_in_datetime: string // ISO
  check_out_datetime: string // ISO
  total_persons_amount: number
  preferred_contact: string
  comment: string
  bill: Bill
}
