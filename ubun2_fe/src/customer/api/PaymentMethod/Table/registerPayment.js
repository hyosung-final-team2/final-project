import privateFetch from '../../common/privateFetch';

// 로그인
export const registerPayment = async paymentData => await privateFetch.post('/customers/payments/', paymentData);
