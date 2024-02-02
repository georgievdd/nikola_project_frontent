export interface IReservationOptions {
    "base_persons_amount": number
    "max_persons_amount": number
    "price_per_extra_person": IReservationOptionsTimes
    "check_out_times": IReservationOptionsTimes,
    "check_in_times": IReservationOptionsTimes
}

export interface IReservationOptionsTimes {
    "default": string
    "earliest": string
    "latest": string
    "12:00": number
    "15:00": number
}

export  interface IReservationPrice {
    "receipt": IReservationReceipt
    "total": number,
    "house_id": number,
    "check_in_datetime": string //"2024-03-08T13:00:00Z"
    "check_out_datetime": string,
    "extra_persons_amount": number
}

export interface IReservationReceipt {
    "nights": IReceiptNight[]
    "extra_services": IExtraService[]
    "total": number
    "nights_total": number
    "extra_services_total": number
}

export interface IExtraService {
    "price": number
    "date": string
    "time": string
    "type": string
    "name": string
}

export interface IReceiptNight {
    "price": number,
    "date": string,
    "time": null | string,
    "type": string,
    "name": string
}


export interface IReservationPriceRequest {
    "check_in_datetime": string,
    "check_out_datetime": string,
    "extra_persons_amount": number
}