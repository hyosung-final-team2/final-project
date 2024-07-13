import privateFetch from '../../../common/privateFetch.js';

// 전체 승인 대기 주문 리스트 조회
export const getPendingOrders = async (page, size) => {
  return await privateFetch.get(`/customers/orders/pending`, {
    params: {
      page: page - 1,
      size: size,
    },
  });
};

// 단건 주문 승인 & 취소
export const updatePendingOrder = async requestData => {
  const res = await privateFetch.put(`/customers/orders/approve`, requestData);
  return res.data;
};

// 정기 주문 승인 & 취소
export const updateSubscriptionOrder = async requestData => {
  const res = await privateFetch.put(`/customers/orders/subscription/approve`, requestData);
  return res.data;
};
