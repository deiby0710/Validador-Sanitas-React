import axios from 'axios';
import { logoutWithReason } from '../utils/logout';
import { defaultAlert } from '../utils/alert';
import { handleServerError } from '../utils/serverError';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Interceptor para añadir token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Response: detecta token inválido / expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      await logoutWithReason("expired");
    }
    // 🚨 Errores del servidor
    // if (status >= 500) {
    //   handleServerError(status)
    // }
    return Promise.reject(error)
  }
)