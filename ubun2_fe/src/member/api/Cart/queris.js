import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCart, deleteCart, getCart, updateCartQuantity } from './cart.js';
import useMemberStore from '../../store/memberStore.js';
import useStoreStore from '../../store/storeStore.js';
import toast from 'react-hot-toast';
import { errorToastStyle, successToastStyle } from '../toastStyle.js';

export const useCreateCart = cartAddProduct => {
  const { memberId } = useMemberStore();
  const { customerId } = useStoreStore();
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      toast.success('장바구니에 상품을 담았어요.', successToastStyle);
    },
    onError: error => {
      toast.error('장바구니에 상품을 담지 못했어요. 다시 시도해주세요.', errorToastStyle);
      console.error('Cart addition failed:', error);
    },
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
      toast.success('상품이 삭제되었습니다.', successToastStyle);
    },
    onError: error => {
      toast.error('상품 삭제 실패! 다시 시도해주세요.', errorToastStyle);
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
    },
    onError: error => {
      console.log('장바구니 물품 수량 변경 실패 : ', error);
    },
  });
};
