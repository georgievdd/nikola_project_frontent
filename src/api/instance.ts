import axios from "axios"

export const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/backend/api/v1`
export const INTERNAL_API_URL = `${process.env.NEXT_PUBLIC_INTERNAL_BACKEND_URL}/backend/api/v1`


export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postMail = (data: any) => 
    axios.post('https://vite-mailer.ru/send', data)