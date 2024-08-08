import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { successToastStyle } from '../toastStyle';
import {
  getCards,
  getAccounts,
  getCard,
  getAccount,
  registerPayment,
  deletePayment,
  updatePayment,
  checkIfPasswordExists,
  checkPassword,
  setNewPassword,
  setDefaultPayment,
} from './payments';

export const useGetCards = memberId => {
  return useQuery({
    queryKey: ['payments', { memberId: memberId, type: 'cards' }],
    queryFn: () => getCards(),
  });
};

export const useGetAccounts = memberId => {
  return useQuery({
    queryKey: ['payments', { memberId: memberId, type: 'accounts' }],
    queryFn: () => getAccounts(),
  });
};

export const useCheckIfPasswordExists = () => {
  return useQuery({
    queryKey: ['payments', { type: 'password' }],
    queryFn: () => checkIfPasswordExists(),
  });
};

export const useGetCard = paymentMethodId => {
  return useQuery({
    queryKey: ['payments', { cardId: paymentMethodId, type: 'card' }],
    queryFn: () => getCard(paymentMethodId),
  });
};

export const useGetAccount = paymentMethodId => {
  return useQuery({
    queryKey: ['payments', { accountId: paymentMethodId, type: 'account' }],
    queryFn: () => getAccount(paymentMethodId),
  });
};

export const useRegisterPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => registerPayment(data),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      console.log(response);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentMethodId, data }) => updatePayment(paymentMethodId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodId => deletePayment(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onError: error => {
      console.log('error', error);
    },
  });
};

export const useCheckPassword = () => {
  return useMutation({
    mutationFn: paymentMethod => checkPassword(paymentMethod),
    onSuccess: res => {
      return res.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useSetNewPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: password => setNewPassword(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onError: error => {
      console.log('error', error);
    },
  });
};

export const useSetDefaultPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentMethodId => setDefaultPayment(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('기본 결제수단으로 설정되었습니다.', successToastStyle);
    },
    onError: error => {
      console.log('error', error);
    },
  });
};
