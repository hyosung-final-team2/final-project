import privateFetch from '../../../common/privateFetch.js';
import qs from 'qs';

// 전체 주문 리스트 조회
export const getOrders = async (page, size, sort, searchCategory, searchKeyword, orderStatus) => {
  return await privateFetch.get(`/customers/orders/`, {
    params: {
      page: page - 1,
      size: size,
      sort: sort, // 무조건 콤마! ["memberEmail", "memberName", "memberPhone", "createdAt"]
      searchCategory: searchCategory, //  null, "memberEmail", "memberName", "memberPhone", "createdAt"
      searchKeyword: searchKeyword, // null
      orderStatus: orderStatus,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};
