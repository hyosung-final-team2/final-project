import privateFetch from '../../../common/privateFetch.js';

// 전체 주문 리스트 조회
export const getOrders = async (page, size) => {
  return await privateFetch.get(`/customers/orders/`, {
    params: {
      page: page - 1,
      size: size,
    },
  });
};
