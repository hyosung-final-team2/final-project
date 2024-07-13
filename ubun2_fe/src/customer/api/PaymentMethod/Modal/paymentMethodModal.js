import privateFetch from '../../common/privateFetch';

export const getPaymentMethodDetail = async paymentMethodId => await privateFetch.get(`/customers/payments/${paymentMethodId}`);
