import privateFetch from '../../../customer/api/common/privateFetch';

export const createOrder = async orderData => {
  const res = await privateFetch.post('/members/orders', orderData);
  console.log(res);
  console.log(orderData);
  return res;
};
