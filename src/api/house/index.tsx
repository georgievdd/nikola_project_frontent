import { House } from "@/entity/House"
import { API_URL } from "../instance"

export const getHouses = async(): Promise<House[]> =>
    fetch(`${API_URL}/houses`, {
        next: {
            revalidate: 10,
        }
    })
    .then(res => res.json())