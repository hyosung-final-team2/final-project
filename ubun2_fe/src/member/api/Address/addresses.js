import privateFetch from '../../../customer/api/common/privateFetch';

export const getMyAddresses = async () => {
  return await privateFetch.get('/members/addresses/');
};

export const getAddress = async addressId => {
  return await privateFetch.get(`/members/addresses/${addressId}`);
};

export const registerAddress = async data => {
  return await privateFetch.post('/members/addresses/', data);
};

export const deleteAddress = async addressId => {
  return await privateFetch.delete(`/members/addresses/${addressId}`);
};

export const updateAddress = async (addressId, data) => {
  console.log('data:', data);
  return await privateFetch.put(`/members/addresses/${addressId}`, data);
};
