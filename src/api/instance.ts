import axios from "axios";

const HOST = process.env.REACT_APP_BACKEND_HOST
const PORT = process.env.REACT_APP_BACKEND_PORT
export const apiUrl = `http://${HOST}:${PORT}/api/v1`
export const staticUrl = `http://${HOST}:${PORT}`

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});