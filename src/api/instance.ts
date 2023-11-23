import axios from "axios";

const apiUrl = 'http://127.0.0.1:8002/api/v1';

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});