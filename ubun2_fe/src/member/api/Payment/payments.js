import privateFetch from '../../../customer/api/common/privateFetch';

export const getCards = async () => {
  return await privateFetch.get('/members/payments/cards');
};

export const getAccounts = async () => {
  return await privateFetch.get('/members/payments/accounts');
};

export const checkIfPasswordExists = async () => {
  console.log('checkIfPasswordExists');
  return await privateFetch.get('/members/payments/password');
};

export const getCard = async cardId => {
  return await privateFetch.get(`/members/payments/cards/${cardId}`);
};

export const getAccount = async accountId => {
  return await privateFetch.get(`/members/payments/accounts/${accountId}`);
};

export const registerPayment = async data => {
  return await privateFetch.post('/members/payments', data);
};

export const deletePayment = async paymentId => {
  return await privateFetch.delete(`/members/payments/${paymentId}`);
};

export const updatePayment = async (paymentId, data) => {
  return await privateFetch.put(`/members/payments/${paymentId}`, data);
};
