import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCart, deleteCart, getCart, updateCartQuantity } from './cart.js';
import useMemberStore from '../../store/memberStore.js';
import useStoreStore from '../../store/storeStore.js';
import toast from 'react-hot-toast';

export const useCreateCart = cartAddProduct => {
  const { memberId } = useMemberStore();
  const { customerId } = useStoreStore();
  const cartProducts = [cartAddProduct];

  const cartData = [
    {
      customerId,
      memberId,
      cartProducts,
    },
  ];

  return useMutation({
    mutationFn: () => createCart(cartData),
  });
};

export const useGetCarts = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(),
    initialData: () => {
      const cachedData = queryClient.getQueryData(['carts']);
      if (cachedData) {
        console.log(cachedData);
        return cachedData;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      // TODO : 뱃지로 대체
      console.log('장바구니 물품 삭제 완료');
    },
    onError: error => {
      // TODO : 뱃지로 대체
      console.log('장바구니 물품 삭제 실패 : ', error);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      // TODO : 뱃지로 대체
      console.log('장바구니 물품 수량 변경 완료');
    },
    onError: error => {
      // TODO : 뱃지로 대체
      console.log('장바구니 물품 수량 변경 실패 : ', error);
    },
  });
};
