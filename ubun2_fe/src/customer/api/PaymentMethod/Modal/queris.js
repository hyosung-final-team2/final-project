import { useQuery } from '@tanstack/react-query';
import { getPaymentMethodDetail } from './paymentMethodModal.js';

export const useGetPaymentDetail = paymentMethodId => {
  return useQuery({
    queryKey: ['payment', { paymentMethodId: paymentMethodId }],
    queryFn: () => getPaymentMethodDetail(paymentMethodId),
    enabled: paymentMethodId !== null,
    staleTime: 5000,
  });
};
