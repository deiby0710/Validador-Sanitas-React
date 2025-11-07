import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://190.147.27.194:4000'
})

// Interceptor para añadir token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});