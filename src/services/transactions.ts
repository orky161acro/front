import axiosClient from './httpClient';

export function fetchTransactionsService() {
  return axiosClient.get('/api/v1/transactions/');
}
export function deleteTransactionService(id) {
  return axiosClient.delete('/api/v1/transactions/');
}
export function createTransactionService(transaction) {
  return axiosClient.post('/api/v1/transactions/');
}
export function updateTransactionService(id, transaction) {
  return axiosClient.put('/api/v1/transactions/');
}
