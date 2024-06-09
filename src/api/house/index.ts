import { House, HouseOptions, Picture } from "@/entity/House"
import sizeOf from 'image-size'
import { FETCH_HOUSES, FETCH_HOUSE, FETCH_HOUSE_OPTIONS } from "../endpoints"


export const getHouses = async(): Promise<House[]> => 
    fetch(FETCH_HOUSES, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => [])

export const getHouse = async(id: string): Promise<House | null> => {
    return fetch(FETCH_HOUSE(id), {
        next: {
            revalidate: 10
        },
    method: 'GET',
    })
    .then(res => {
        return res.json()
    })
    .catch(e => {
        return null;
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