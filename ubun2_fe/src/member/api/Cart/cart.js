import privateFetch from '../../../customer/api/common/privateFetch.js';

export const createCart = async cartData => await privateFetch.post('/members/carts', cartData);

export const getCart = async () => {
  const res = await privateFetch.get(`/members/carts`);
  return res;
};

export const deleteCart = async requestData => {
  console.log('Delete request payload :', requestData);
  const res = await privateFetch({
    method: 'delete',
    url: '/members/carts',
    data: requestData,
  });
  return res;
};

export const updateCartQuantity = async requestData => {
  console.log('Update request payload :', requestData);
  const res = await privateFetch({
    method: 'put',
    url: '/members/carts',
    data: requestData,
  });
  return res;
};
