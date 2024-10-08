import axios from 'axios'

import {JSONCookie} from 'src/helpers'
export const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/backend/api/v1`
// eslint-disable-next-line max-len
export const INTERNAL_API_URL = `${process.env.NEXT_PUBLIC_INTERNAL_BACKEND_URL}/backend/api/v1`

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const csrf = new JSONCookie(document.cookie).get('csrftoken')
  config.headers['X-Csrftoken'] = csrf
  return config
})

export const postMail = (data: any) =>
  axios.post('https://vite-mailer.ru/send', data)
