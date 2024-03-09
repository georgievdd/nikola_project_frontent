import { House } from "@/entity/House"
import { INTERNAL_API_URL } from "../instance"


export const getHouses = async(): Promise<House[]> => 
    fetch(`${INTERNAL_API_URL}/houses/`, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => {
        console.log(res);
        return res.json()
    })
    .catch(e => {
        console.log(e);
        return [];
    })