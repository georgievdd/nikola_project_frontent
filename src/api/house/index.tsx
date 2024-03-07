import { House } from "@/entity/House"
import { API_URL } from "../instance"


export const getHouses = async(): Promise<House[]> => Promise.resolve([])
    // return fetch(`${API_URL}/houses`, { //`${API_URL}/houses`
    //     next: {
    //         revalidate: 10,
    //     }
    // })
    // .then(res => {
    //     const a = res.json()
    //     console.log(a);
    //     return a
    // })