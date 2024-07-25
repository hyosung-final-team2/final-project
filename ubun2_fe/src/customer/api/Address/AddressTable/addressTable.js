import privateFetch from '../../common/privateFetch.js';

// 전체 주소 리스트 조회
export const getAddresses = async (page, size) =>
  await privateFetch.get('/customers/addresses', {
    params: {
      page: page - 1,
      size: size,
    },
  });
