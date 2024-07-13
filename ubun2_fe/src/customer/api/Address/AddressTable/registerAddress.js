import privateFetch from '../../common/privateFetch';

// 로그인
export const registerAddress = async addressData => await privateFetch.post('/customers/addresses/', addressData);
