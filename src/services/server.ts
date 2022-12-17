import { Axios } from 'axios';

export const api = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
