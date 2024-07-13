import { getCardPayments } from './cardPaymentTable.js';
import { getAccountPayments } from './accountPaymentTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetCardPayments = (page, size) => {
  return useQuery({
    queryKey: ['payment', { type: 'CARD', page: page }],
    queryFn: () => getCardPayments(page, size),
  });
};

export const useGetAccountPayments = (page, size) => {
  return useQuery({
    queryKey: ['payment', { type: 'ACCOUNT', page: page }],
    queryFn: () => getAccountPayments(page, size),
  });
};
