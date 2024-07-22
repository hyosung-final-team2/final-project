import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, getProducts, modifyProduct, registerProduct } from './productTable.js';

export const useGetProducts = (page, size) => {
  return useQuery({
    queryKey: ['product', { page: page }],
    queryFn: () => getProducts(page, size),
  });
};

export const useRegisterProduct = (productRequest, imageFile, currentPage) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => registerProduct(productRequest, imageFile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage }] }),
  });
};

export const useModifyProduct = (productRequest, imageFile, currentPage) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => modifyProduct(productRequest, imageFile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage }] }),
  });
};

export const useDeleteProduct = (productId, currentPage) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage }] }); // TODO: 코너 케이스 - 해당 페이지의 마지막 row 라면 체크해서 하나 이전 페이지 갱신해야함
    },
    onError: error => {
      console.log('error', error);
    },
  });
};
