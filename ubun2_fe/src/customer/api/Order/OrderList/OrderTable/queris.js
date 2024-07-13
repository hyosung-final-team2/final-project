import { getOrders } from './orderTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = (page, size) => {
  return useQuery({
    queryKey: ['order', page],
    queryFn: () => getOrders(page, size),
  });
};
