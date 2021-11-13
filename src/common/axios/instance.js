import axios from 'axios';
import { Cookies } from 'react-cookie';

const baseUrl = 'http://35.201.2.209:8000';

const instance = axios.create({
  baseURL: baseUrl,
});

const axiosAuth = axios.create({
  baseURL: baseUrl,
});
axiosAuth.interceptors.request.use(function (config) {
  const cookies = new Cookies();
  const token = cookies.get('bearer', { path: '/' });
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export { instance, axiosAuth };
