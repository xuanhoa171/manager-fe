import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'content-type': 'application/json' },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState()?.authentication?.accessToken?.token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient;
