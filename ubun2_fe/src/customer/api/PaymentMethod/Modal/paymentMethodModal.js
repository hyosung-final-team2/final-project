import privateFetch from '../../common/privateFetch';

export const getPaymentMethodDetail = async paymentMethodId => await privateFetch.get(`/customers/payments/${paymentMethodId}`);

export const registerPayment = async paymentData => await privateFetch.post('/customers/payments/', paymentData);

export const deletePayment = async paymentMethodId => await privateFetch.delete(`/customers/payments/${paymentMethodId}`);
