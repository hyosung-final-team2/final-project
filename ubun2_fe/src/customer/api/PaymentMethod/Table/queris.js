import { getCardPayments } from './cardPaymentTable.js';
import { getAccountPayments } from './accountPaymentTable.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { registerPayment } from './registerPayment.js';

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

export const useRegisterPayment = () => {
  return useMutation({
    mutationFn: paymentData => registerPayment(paymentData),
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.log(error);
    },
  });
};
