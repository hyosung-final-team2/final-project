import toast from 'react-hot-toast';
import { getPendingOrders, updatePendingOrder, updateSubscriptionOrder } from './pendingOrderTable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 대기 주문 목록 불러오기
export const useGetPendingOrders = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['pendingOrder', page, sort, searchCategory, searchKeyword],
    queryFn: () => getPendingOrders(page, size, sort, searchCategory, searchKeyword),
  });
};

// 대기 주문 승인 & 취소 요청
export const useUpdatePendingOrder = currentPage => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestData }) => {
      const regularOrders = requestData.filter(order => !order.subscription).map(({ orderId, orderStatus }) => ({ orderId, orderStatus }));
      const subscriptionOrders = requestData
        .filter(order => order.subscription)
        .map(({ subscriptionOrderId, orderStatus }) => ({ subscriptionOrderId, orderStatus }));

      const promises = [];
      if (regularOrders.length > 0) {
        promises.push(updatePendingOrder(regularOrders));
      }
      if (subscriptionOrders.length > 0) {
        promises.push(updateSubscriptionOrder(subscriptionOrders));
      }

      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingOrder', currentPage] });
      toast.success('주문 대기 상태 변경이 완료되었습니다.');
    },
    onError: error => toast.error(`주문 대기 상태 변경 실패: ${error.message}`),
  });
};
