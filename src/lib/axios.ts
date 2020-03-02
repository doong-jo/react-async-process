import axios from 'axios';

export const mainAxios = axios.create({
  baseURL: 'https://www.mocky.io',
  withCredentials: true
});
