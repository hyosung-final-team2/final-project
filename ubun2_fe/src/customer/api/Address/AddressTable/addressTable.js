import privateFetch from '../../common/privateFetch.js';
import qs from 'qs';

// 전체 주소 리스트 조회
export const getAddresses = async (page, size, sort, searchCategory, searchKeyword) => {
  console.log(page, size, sort, searchCategory, searchKeyword);
  return await privateFetch.get('/customers/addresses', {
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
