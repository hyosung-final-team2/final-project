import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, getProducts, modifyProduct, registerProduct } from './productTable.js';
import useProductTableStore from "../../../../store/ProductTable/productTableStore.js";

export const useGetProducts = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    // queryKey: ['product', page, sort, searchCategory, searchKeyword],
    queryKey: ['product', {page, sort, searchCategory, searchKeyword}],
    queryFn: () => getProducts(page, size, sort, searchCategory,searchKeyword),
  });
};

export const useRegisterProduct = (productRequest, imageFile, currentPage) => {
  const {sort,searchCategory,searchKeyword} = useProductTableStore()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => registerProduct(productRequest, imageFile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage, sort,searchCategory,searchKeyword }] }),
  });
};

export const useModifyProduct = (productRequest, imageFile, currentPage) => {
  const {sort,searchCategory,searchKeyword} = useProductTableStore()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => modifyProduct(productRequest, imageFile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage,sort,searchCategory,searchKeyword }] }),
  });
};

export const useDeleteProduct = (productId, currentPage) => {
  const {sort,searchCategory,searchKeyword} = useProductTableStore()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', { page: currentPage,sort,searchCategory,searchKeyword }] }); // TODO: 코너 케이스 - 해당 페이지의 마지막 row 라면 체크해서 하나 이전 페이지 갱신해야함
    },
    onError: error => {
      console.log('error', error);
    },
  });
};
