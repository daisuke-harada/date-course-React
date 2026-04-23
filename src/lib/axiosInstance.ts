import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import store from 'reducers/index';
import { clearAuth } from 'reducers/loginSlice';

const options = {
  ignoreHeaders: true,
};

const axiosInstance = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN_API,
}), options);

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().session.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
