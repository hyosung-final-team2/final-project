import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder } from './order';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: data => createOrder(data),
  });
};
