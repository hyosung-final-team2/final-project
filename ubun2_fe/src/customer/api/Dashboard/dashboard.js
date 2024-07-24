import privateFetch from '../common/privateFetch';

//많이 팔린 상품 리스트 통계 api
export const getTopSellingProducts = async (startDate, endDate) => await privateFetch.get(`/customers/dashboard/top-selling/${startDate}/${endDate}`);

//기간별 주문 목록 조회 (일반 주문 + 구독 주문) api
export const getOrdersByDate = async (startDate, endDate) => await privateFetch.get(`/customers/dashboard/orders/${startDate}/${endDate}`);

//상품 총 개수 조회 (전체/활성/비활성)
export const getProductCount = async () => await privateFetch.get(`/customers/dashboard/products/count`);

//고객이 관리하는 회원 수 조회
export const getCustomerCount = async () => await privateFetch.get(`/customers/dashboard/members/count`);

//기간별 주소 목록 조회
export const getAddressesByDate = async (startDate, endDate) => await privateFetch.get(`/customers/dashboard/addresses/${startDate}/${endDate}`);

//기간 동안의 주문 횟수와 총액 조회
export const getOrdersCountAndRevenue = async (startDate, endDate) => await privateFetch.get(`/customers/dashboard/orders/summary/${startDate}/${endDate}`);

//기간 동안의 주문 횟수 조회
export const getOrdersCount = async (startDate, endDate) => await privateFetch.get(`/customers/dashboard/orders/count/${startDate}/${endDate}`);
