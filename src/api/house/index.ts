import { House, HouseOptions, Picture } from "@/entity/House"
import sizeOf from 'image-size'
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
    .then(res => {
        const data = res.json()
            .then(async (house) => {
            await Promise.all(house.pictures.map((pic: Picture, idx: number) =>
                fetch(pic.picture)
                    .then(res => res.arrayBuffer())
                    .then(arrayBuffer => Buffer.from(arrayBuffer))
                    .then(buffer => sizeOf(buffer))
                    .then(({height, width}) => {
                        house.pictures[idx].height = height
                        house.pictures[idx].width = width
                    })
            ))
            return house
        })
        return data
    })
    .catch(e => {
        console.log(e)
        return [];
    })

export const getHouseOptions = async(id: string): Promise<HouseOptions> => 
    fetch(`${INTERNAL_API_URL}/houses/reservations/${id}/options`, {
        next: {
            revalidate: 10
        },
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
        return null;
    })