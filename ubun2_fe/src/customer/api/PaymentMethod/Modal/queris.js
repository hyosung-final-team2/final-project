import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPaymentMethodDetail, registerPayment, deletePayment, searchMember, getMemberPayments } from './paymentMethodModal.js';
import { toast } from 'react-hot-toast';

export const useGetPaymentDetail = paymentMethodId => {
  return useQuery({
    queryKey: ['payment', { paymentMethodId: paymentMethodId }],
    queryFn: () => getPaymentMethodDetail(paymentMethodId),
    enabled: paymentMethodId !== null,
    staleTime: 5000,
  });
};

export const useRegisterPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentData => registerPayment(paymentData),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      toast.success('결제수단이 성공적으로 추가되었습니다.');
      console.log(response);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useDeletePaymentMethod = currentPage => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodId => deletePayment(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment'] }); // TODO: 코너 케이스 - 해당 페이지의 마지막 row 라면 체크해서 하나 이전 페이지 갱신해야함
      toast.success('결제수단이 성공적으로 삭제되었습니다.');
    },
    onError: error => {
      console.log('error', error);
      toast.error(`Failed to delete PaymentMethod: ${error.message}`);
    },
  });
};

export const useSearchMember = (page, size, sort, searchKeyword) => {
  return useQuery({
    queryKey: ['searchMember', page, size, sort, searchKeyword],
    queryFn: () => {
      return searchMember(searchKeyword);
    },
    enabled: searchKeyword?.trim() !== '', // searchKeyword가 비어있지 않을 때만 쿼리 실행
  });
};

export const useGetMemberPayments = memberId => {
  return useQuery({
    queryKey: ['payment', { memberId }],
    queryFn: () => getMemberPayments(memberId),
    enabled: !!memberId,
  });
};
