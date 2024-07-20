import privateFetch from '../../../customer/api/common/privateFetch.js';

export const createCart = async cartData => await privateFetch.post('/members/carts', cartData);

export const getCart = async () => {
  const res = await privateFetch.get(`/members/carts`);
  return res;
};
