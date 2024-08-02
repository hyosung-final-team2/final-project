import { getCardPayments, deleteSelectedPayments } from './cardPaymentTable.js';
import { getAccountPayments } from './accountPaymentTable.js';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore.js';
import { toast } from 'react-hot-toast';

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

export const useDeleteSelectedPayments = selectedPayments => {
  const queryClient = useQueryClient();

  const count = selectedPayments.length;
  const convertSelectedPayments = selectedPayments.map(id => ({
    paymentMethodId: id,
  }));

  return useMutation({
    mutationFn: () => deleteSelectedPayments(convertSelectedPayments),
    onSuccess: response => {
      console.log('response:', response);
      toast.success(`${count}개의 결제수단이 정상적으로 삭제되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['payment'] });
    },
    onError: () => toast.error('결제수단 삭제에 실패하였습니다.'),
  });
};
