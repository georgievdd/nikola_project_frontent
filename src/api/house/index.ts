import {
    IHouse,
    IHousesQueryRequest,
    IHousesCalendarRequest,
    IHousesCalendarResponse,
    INewReservationRequest
} from "../../interfaces/houses";
import endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {IReservationOptions, IReservationPrice, IReservationPriceRequest} from "../../interfaces/houses/reservation";



export const getAll = (data: IHousesQueryRequest) =>
  axiosInstance.get<IHouse[]>(endpoints.HOUSE.LIST, {params: data});

export const getCalendar = (data: IHousesCalendarRequest) =>
    axiosInstance.get<IHousesCalendarResponse>(endpoints.HOUSE.CALENDAR, {params: data})

export const getHouseCalendar = (id: number, data: IHousesCalendarRequest) =>
    axiosInstance.get<IHousesCalendarResponse>(endpoints.HOUSE.ID_CALENDAR(id), {params: data})

export const newReservation = (id: number, data: INewReservationRequest) =>
    axiosInstance.post<any>(endpoints.HOUSE.RESERVATION(id), data)

export const getReservationOptions = (id: number) =>
    axiosInstance.get<IReservationOptions>(endpoints.HOUSE.RESERVATION_OPTIONS(id))

export const getReservationPrice = (id: number, data: IReservationPriceRequest) =>
    axiosInstance.put<IReservationPrice>(endpoints.HOUSE.RESERVATION_PRICE(id), data)