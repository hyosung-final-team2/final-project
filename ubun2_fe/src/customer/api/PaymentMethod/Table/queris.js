import { getCardPayments } from './cardPaymentTable.js';
import { getAccountPayments } from './accountPaymentTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetCardPayments = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['payment', { type: 'CARD', page, sort, searchCategory, searchKeyword }],
    queryFn: () => getCardPayments(page, size, sort, searchCategory, searchKeyword),
  });
};

export const useGetAccountPayments = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['payment', { type: 'ACCOUNT', page, sort, searchCategory, searchKeyword }],
    queryFn: () => getAccountPayments(page, size, sort, searchCategory, searchKeyword),
  });
};
