import privateFetch from '../../common/privateFetch';

export const getPaymentMethodDetail = async paymentMethodId => await privateFetch.get(`/customers/payments/${paymentMethodId}`);

export const registerPayment = async paymentData => await privateFetch.post('/customers/payments/', paymentData);

export const deletePayment = async paymentMethodId => await privateFetch.delete(`/customers/payments/${paymentMethodId}`);

export const searchMember = async searchKeyword => {
  return await privateFetch.get('/customers/addresses/search-member', {
    params: {
      page: 0,
      size: 5,
      searchCategory: 'memberName',
      searchKeyword: searchKeyword,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};

export const getMemberPayments = async memberId => {
  return await privateFetch.get(`/customers/payments/member/${memberId}`);
};
