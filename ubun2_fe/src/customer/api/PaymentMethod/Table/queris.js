import { getCardPayments } from './cardPaymentTable.js';
import { getAccountPayments } from './accountPaymentTable.js';
import { useQuery } from '@tanstack/react-query';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore.js';

export const useGetPayments = (page, size, sort, searchCategory, searchKeyword) => {
  const { paymentMethodType } = paymentMethodStore();
  const isAccount = paymentMethodType === 'ACCOUNT';

  return useQuery({
    queryKey: ['payment', { type: isAccount ? 'ACCOUNT' : 'CARD', page, sort, searchCategory, searchKeyword }],
    queryFn: isAccount
      ? () => getAccountPayments(page, size, sort, searchCategory, searchKeyword)
      : () => getCardPayments(page, size, sort, searchCategory, searchKeyword),
  });
};
