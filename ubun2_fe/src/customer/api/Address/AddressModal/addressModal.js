import privateFetch from '../../common/privateFetch';

export const getAddressDetail = async addressId => await privateFetch.get(`/customers/addresses/${addressId}`);
