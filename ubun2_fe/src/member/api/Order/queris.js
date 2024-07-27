import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorToastStyle, successToastStyle } from '../toastStyle';
import { validateOrder, createOrder, getOrderDetail, getOrderList, getSubscriptionOrder, updateOrderCancel, updateSubscriptionCancel } from './order';

export const useValidateOrder = () => {
  return useMutation({
    mutationFn: data => validateOrder(data),
    onError: error => {
      const errorMessage = error.response?.data?.errorMessage || '유효성 검사에 실패했습니다. 다시 시도해주세요.';
      toast.error(errorMessage, errorToastStyle);
    },
  });
};

export const useCreateOrder = navigate => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('주문이 완료되었습니다.', successToastStyle);
      navigate('/member/app/mypage/order-list', { replace: true }); // 성공 시 주문목록 리스트로 이동
    },
    onError: error => {
      toast.error('주문에 실패했습니다. 다시 시도해주세요.', errorToastStyle);
      console.error('Order creation failed:', error);
      navigate('/member/app/home', { replace: true }); // 실패 시 홈으로 이동
    },
  });
};

export const useGetOrderList = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrderList(),
  });
};

export const useGetOrderDetail = (customerId, orderId) => {
  console.log(customerId, orderId);
  return useQuery({
    queryKey: ['orders', customerId, orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
  });
};

export const useGetSubscriptionOrderDetail = subscriptionOrderId => {
  return useQuery({
    queryKey: ['subscriptionOrder', subscriptionOrderId],
    queryFn: () => getSubscriptionOrder(subscriptionOrderId),
    enabled: !!subscriptionOrderId,
  });
};

export const useUpdateCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId, orderId }) => updateOrderCancel({ customerId, orderId }),
    onSuccess: ({ customerId, orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', customerId, orderId] });
      toast.success('주문이 성공적으로 취소되었습니다.', successToastStyle);
    },
    onError: error => {
      toast.error('주문 취소에 실패했습니다. 다시 시도해주세요.', errorToastStyle);
      console.error('Failed to cancel order:', error);
    },
  });
};

export const useUpdateSubscriptionCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => updateSubscriptionCancel(data),
    onSuccess: ({ subscriptionOrderId }) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptionOrder', subscriptionOrderId] });
      toast.success('정기주문 상품이 수정되었습니다.', successToastStyle);
    },
    onError: error => {
      toast.error('정기주문 상품 수정에 실패했습니다. 다시 시도해주세요.', successToastStyle);
      console.error('Failed to update subscription order:', error);
    },
  });
};
