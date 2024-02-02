export interface IHouse {
  id: number;
  name: string;
  description: string;
  features: IFeature[];
  pictures: string[];
  base_price: number;
  total_price?: any;
  base_persons_amount: number;
  max_persons_amount: number;
  price_per_extra_person: number;
}

export interface IFeature {
  id:   number
  name: string
  icon: string
}

export interface IHousesQueryRequest {
  max_persons_amount?: number
  check_in_date?:      string
  check_out_date?:     string
}


export interface IHousesCalendarRequest {
  month: number
  year:  number
  chosen_check_in_date?: string
}


// ключи в Record - даты формата dd-MM-yyyy
export interface IHousesCalendarResponse {
  calendar: Record<string, CalendarDayResponse | CalendarDayResponseSelect>
}



export interface CalendarDayResponse {
  weekday: number
  is_holiday: boolean
  check_in_is_available: boolean
  reason?: string
}

export interface CalendarDayResponseSelect {
  weekday: number,
  is_holiday: boolean,
  price?: number,
  check_out_is_available: false,
}


export interface INewReservationRequest {
  check_in_datetime: string,
  check_out_datetime: string,
  extra_persons_amount: number,
  email: string,
  first_name: string,
  last_name: string,
  preferred_contact: string
}

