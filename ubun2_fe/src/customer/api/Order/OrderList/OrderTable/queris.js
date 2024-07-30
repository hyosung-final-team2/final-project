import { getOrders } from './orderTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['order', page, sort, searchCategory, searchKeyword],
    queryFn: () => getOrders(page, size, sort, searchCategory, searchKeyword),
  });
};
