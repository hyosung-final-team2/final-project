import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from './ProductDetailModal.js';

export const useGetProductDetail = productId => {
  return useQuery({
    queryKey: ['product', { productId: productId }],
    queryFn: () => getProductDetail(productId),
    // enabled: false,
    enabled: productId !== null,
    staleTime: 5000,
  });
};
