import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import { cloneDeep } from 'es-toolkit';
import { ENV } from './env';

const request = axios.create({
  baseURL: ENV.isProd ? undefined : 'http://127.0.0.1:3000',
});

request.interceptors.request.use(config => {
  const headers = cloneDeep(config.headers || {});
  const token = localStorage.getItem('modukit-token');
  if (token) {
    headers.Authorization = token;
  }
  config.headers = headers;
  return config;
});

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('modukit-token');
      const path = window.location.pathname;
      Toast.error('登录过期，请重新登录');
      window.location.href = `/login?redirect=${path}`;
    } else {
      const msg = response.data?.message;
      if (msg) {
        Toast.error(msg);
      }
    }
  },
);

export default request;
