import {IHouse, IHousesQueryRequest, IHousesCalendarRequest, IHousesCalendarResponse} from "../../interfaces/houses";
import endpoints from "../endpoints";
import { axiosInstance } from "../instance";



export const getAll = (data: IHousesQueryRequest) =>
  axiosInstance.get<IHouse[]>(endpoints.HOUSE.LIST, {params: data});

export const getCalendar = (data: IHousesCalendarRequest) =>
    axiosInstance.get<IHousesCalendarResponse>(endpoints.HOUSE.CALENDAR, {params: data})