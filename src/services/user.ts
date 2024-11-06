import { request } from '@/utils';

export const login = (data: any) => {
  return request.post('/api/user/login', data);
};
export const register = (data: any) => {
  return request.post('/api/user/register', data);
};
export const getUserInfo = () => {
  return request.get('/api/user/info');
};
