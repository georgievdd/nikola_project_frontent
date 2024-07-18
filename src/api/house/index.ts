import { House, HouseOptions, Picture } from "@/entity/House"
import { FETCH_HOUSES, FETCH_HOUSE, FETCH_HOUSE_OPTIONS } from "../endpoints"
import { ApiError } from "@/entity/Error"


export const getHouses = async(): Promise<House[]> => 
    fetch(FETCH_HOUSES, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => [])

export const getHouse = async(id: string): Promise<House | ApiError> => {
    return fetch(FETCH_HOUSE(id), {
        next: {
            revalidate: 10
        },
    method: 'GET',
    })
    .then(res => {
        return res.json()
    })
}
export const getHouseOptions = async(id: string): Promise<HouseOptions> => 
fetch(FETCH_HOUSE_OPTIONS(id), {
    next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => {
        return null;
    })