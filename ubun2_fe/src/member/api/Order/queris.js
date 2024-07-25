import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorToastStyle, successToastStyle } from '../toastStyle';
import { createOrder, getOrderDetail, getOrderList, getSubscriptionOrder, updateOrderCancel, updateSubscriptionCancel } from './order';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('주문이 완료되었습니다.', successToastStyle);
    },
    onError: error => {
      toast.error('주문에 실패했습니다. 다시 시도해주세요.', errorToastStyle);
      console.error('Order creation failed:', error);
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
  return useQuery({
    queryKey: ['orders', customerId, orderId],
    queryFn: () => getOrderDetail(customerId, orderId),
    enabled: !!customerId && !!orderId,
  });
};

export const useGetSubscriptionOrderDetail = (customerId, orderId) => {
  return useQuery({
    queryKey: ['subscriptionOrder', customerId, orderId],
    queryFn: () => getSubscriptionOrder(customerId, orderId),
    enabled: !!customerId && !!orderId,
  });
};

export const useUpdateCancelOrder = (customerId, orderId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => updateOrderCancel(data), // TODO: invalidateQueries 적용하기
  });
};

export const useUpdateSuscriptionCancelOrder = (customerId, orderId) => {
  return useMutation({
    mutationFn: data => updateSubscriptionCancel(data), // TODO: invalidateQueries 적용하기
  });
};
