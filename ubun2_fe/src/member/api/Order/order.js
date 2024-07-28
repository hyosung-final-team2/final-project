import privateFetch from '../../../customer/api/common/privateFetch';

export const validateOrder = async orderData => {
  console.log('orderData:', orderData);
  const res = await privateFetch.post('/members/orders/validate', orderData);
  return res.data;
};

export const createOrder = async orderData => {
  const res = await privateFetch.post('/members/orders', orderData);
  return res;
};

export const getOrderList = async () => {
  const res = await privateFetch.get('/members/orders');
  return res;
};

export const getOrderDetail = async orderId => {
  console.log('orderId:', orderId);
  const res = await privateFetch.get(`/members/orders/${orderId}`);
  console.log('res:', res);
  return res;
};

export const getSubscriptionOrder = async orderId => {
  const res = await privateFetch.get(`/members/orders/subscription/${orderId}`);
  console.log(res);
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
