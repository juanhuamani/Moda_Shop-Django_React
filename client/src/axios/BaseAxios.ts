import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const baseUrl: string = import.meta.env.VITE_API_URL as string;

export const publicApi: AxiosInstance = axios.create({
  baseURL: baseUrl + '/public',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authApi: AxiosInstance = axios.create({
  baseURL: baseUrl + '/auth',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAuthenticatedApi: AxiosInstance = axios.create({
  baseURL: baseUrl + '/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`
  }
})

export const protectedApi: AxiosInstance = axios.create({
  baseURL: baseUrl + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`
  }
});

protectedApi.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});
