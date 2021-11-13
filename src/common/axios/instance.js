import axios from 'axios';

const baseUrl = 'http://35.201.2.209:8000';

export const instance = axios.create({
  baseURL: baseUrl,
});

export const axiosAuth = axios.create({
  baseURL: baseUrl,
});
