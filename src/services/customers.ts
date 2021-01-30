import axiosClient from './httpClient';

export function fetchCustomersService() {
  return axiosClient.get('/api/v1/customers/');
}
