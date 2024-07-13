import { useQuery } from '@tanstack/react-query';
import { getOrderDetail, getSubscriptionOrderDetail } from './orderModal.js';

// 단건 주문 조회
export const useGetOrderDetail = (orderId, subscription) => {
  return useQuery({
    queryKey: ['order', { orderId: orderId, subscription: subscription }],
    queryFn: () => (subscription ? getSubscriptionOrderDetail(orderId) : getOrderDetail(orderId)),
    enabled: orderId !== null && subscription !== undefined,
    staleTime: 5000,
  });
};
