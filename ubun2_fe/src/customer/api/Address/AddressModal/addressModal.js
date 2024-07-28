import privateFetch from '../../common/privateFetch';

//단일 주소 조회
export const getAddressDetail = async addressId => await privateFetch.get(`/customers/addresses/${addressId}`);

export const registerAddress = async addressData => await privateFetch.post('/customers/addresses/', addressData);

// 주소 삭제
export const deleteAddress = async addressId => await privateFetch.delete(`/customers/addresses/${addressId}`);

// 회원 주소 수정
export const updateAddress = async (addressId, requestData) => {
  const requestPayload = {
    request: requestData,
  };
  const res = await privateFetch.put(`/customers/addresses/${addressId}`, requestPayload);
};
