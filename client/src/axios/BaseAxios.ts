import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const baseUrl: string = import.meta.env.VITE_API_URL as string;
const accessToken: string | undefined = Cookies.get('access_token');
//const refreshToken: string | undefined = Cookies.get('refresh_token');

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

export const protectedApi: AxiosInstance = axios.create({
  baseURL: baseUrl + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
});  