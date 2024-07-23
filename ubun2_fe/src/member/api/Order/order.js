import privateFetch from '../../../customer/api/common/privateFetch';

export const createOrder = async orderData => {
  const res = await privateFetch.post('/members/orders', orderData);
  return res;
};

export const getOrderList = async () => {
  const res = await privateFetch.get('/members/orders');
  return res;
};

export const getOrderDetail = async (customerId, orderId) => {
  const res = await privateFetch.get(`/members/orders/${customerId}/${orderId}`);
  return res;
};

export const getSubscriptionOrder = async (customerId, orderId) => {
  const res = await privateFetch.get(`/members/orders/subscription/${customerId}/${orderId}`);
  return res;
};

export const updateOrderCancel = async cancelData => {
  const res = await privateFetch.post(`/members/orders/cancel`, cancelData);
  return res;
};

export const updateSubscriptionCancel = async cancelData => {
  const res = await privateFetch.post(`/members/orders/subscription/remove`, cancelData);
  return res;
};
