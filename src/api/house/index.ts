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

export const getHouse = async(id: string): Promise<House> => 
    fetch((() => {console.log(id);return FETCH_HOUSE(id)})(), {
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
        console.log(FETCH_HOUSE(id));
        return null;
    })
// `${INTERNAL_API_URL}/house_reservation_management/${id}/options`
export const getHouseOptions = async(id: string): Promise<HouseOptions> => 
    fetch(FETCH_HOUSE_OPTIONS(id), {
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