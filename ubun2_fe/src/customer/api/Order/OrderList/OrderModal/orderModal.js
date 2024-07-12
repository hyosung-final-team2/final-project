import privateFetch from '../../../common/privateFetch.js';

// 단건 주문 상세 조회
export const getOrderDetail = async orderId => {
  return await privateFetch.get(`/customers/orders/${orderId}`);
};

// 정기 주문 상세 조회
export const getSubscriptionOrderDetail = async subscriptionOrderId => {
  return await privateFetch.get(`/customers/orders/subscription/${subscriptionOrderId}`);
};
