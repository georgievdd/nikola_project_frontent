import { House } from "@/entity/House"
import { INTERNAL_API_URL } from "../instance"


export const getHouses = async(): Promise<House[]> => 
    fetch(`${INTERNAL_API_URL}/houses/`, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => [])

export const getHouse = async(id: string): Promise<House> => 
    fetch(`${INTERNAL_API_URL}/houses/${id}`, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
        return [];
    })