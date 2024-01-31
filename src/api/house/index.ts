import { IHouse, IHouseQueryRequest } from "../../interfaces/houses";
import endpoints from "../endpoints";
import { axiosInstance } from "../instance";



export const getAll = (data: IHouseQueryRequest) => 
  axiosInstance.get<IHouse[]>(endpoints.HOUSE.LIST, {params: data});


