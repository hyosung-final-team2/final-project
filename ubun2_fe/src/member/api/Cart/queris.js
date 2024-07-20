import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCart, deleteCart, getCart } from './cart.js';
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
