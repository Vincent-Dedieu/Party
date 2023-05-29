// require axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const token = localStorage.getItem('accessToken');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
