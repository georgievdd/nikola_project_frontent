import { Picture } from "./House"

export interface Service {
    id: number
    name: string
    description: string
    pictures: Picture[]
    price_string: string
    telegram_contact_link: string
}