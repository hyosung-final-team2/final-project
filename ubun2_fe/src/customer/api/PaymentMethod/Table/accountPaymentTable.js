import privateFetch from '../../common/privateFetch.js';

// 전체 결제수단 리스트 조회
export const getAccountPayments = async (page, size) =>
  await privateFetch.get('/customers/payments/accounts', {
    params: {
      page: page - 1,
      size: size,
    },
  });
