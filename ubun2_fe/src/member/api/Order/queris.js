import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getOrderDetail, getOrderList, getSubscriptionOrder, updateOrderCancel, updateSubscriptionCancel } from './order';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: data => createOrder(data),
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

export const useUpdateCancelOrder = () => {
  return useMutation({
    mutationFn: data => updateOrderCancel(data), // TODO: invalidateQueries 적용하기
  });
};

export const useUpdateSuscriptionCancelOrder = () => {
  return useMutation({
    mutationFn: data => updateSubscriptionCancel(data), // TODO: invalidateQueries 적용하기
  });
};
