import privateFetch from '../../../common/privateFetch.js';

// 상품 상세 조회
export const getProductDetail = async productId => await privateFetch.get(`/customers/products/${productId}`);
