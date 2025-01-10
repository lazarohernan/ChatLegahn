import axios from 'axios';
import cookieService from './cookieService';
import { handleError } from '../utils/errorHandler';
import { logService } from './logService';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Importante para las cookies
});

// Cola para almacenar peticiones fallidas durante el refresh del token
let refreshTokenPromise = null;
const failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue.length = 0;
};

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación
    const token = cookieService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Agregar CSRF token si está disponible
    const csrfToken = sessionStorage.getItem('csrf_token');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    logService.debug('HTTP Request', {
      method: config.method,
      url: config.url,
      hasToken: !!token,
      hasCsrf: !!csrfToken
    });

    return config;
  },
  (error) => {
    logService.error('HTTP Request Error', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    logService.debug('HTTP Response', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error no es de autenticación o ya se intentó refrescar el token
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      handleError(error);
      return Promise.reject(error);
    }

    // Si ya hay un refresh en proceso, encolar esta petición
    if (refreshTokenPromise) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    const refreshToken = cookieService.getRefreshToken();

    if (!refreshToken) {
      logService.error('No refresh token available');
      cookieService.removeTokens();
      cookieService.removeUser();
      window.location.href = '/login';
      return Promise.reject(new Error('No refresh token available'));
    }

    // Crear promesa de refresh y almacenarla
    refreshTokenPromise = (async () => {
      try {
        const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(refreshToken);
        
        cookieService.setAccessToken(accessToken);
        if (newRefreshToken) {
          cookieService.setRefreshToken(newRefreshToken);
        }

        logService.debug('Token refreshed successfully');
        processQueue(null, accessToken);
        return accessToken;
      } catch (err) {
        logService.error('Error refreshing token', err);
        processQueue(err, null);
        cookieService.removeTokens();
        cookieService.removeUser();
        window.location.href = '/login';
        throw err;
      } finally {
        refreshTokenPromise = null;
      }
    })();

    try {
      const token = await refreshTokenPromise;
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

// Métodos HTTP envueltos con manejo de errores
const http = {
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
};

export default http;
