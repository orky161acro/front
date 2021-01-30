import axios from 'axios';
import { Promise } from 'bluebird';

const client = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:9001'
});

client.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default client;
