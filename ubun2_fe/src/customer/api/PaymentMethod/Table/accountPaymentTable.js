import privateFetch from '../../common/privateFetch.js';
import qs from 'qs';

// 전체 결제수단 리스트 조회
export const getAccountPayments = async (page, size, sort, searchCategory, searchKeyword) => {
  return await privateFetch.get('/customers/payments/accounts', {
    params: {
      page: page - 1,
      size: size,
      sort: sort,
      searchCategory: searchCategory,
      searchKeyword: searchKeyword,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};
