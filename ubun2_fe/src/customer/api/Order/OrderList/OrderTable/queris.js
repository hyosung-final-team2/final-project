import { getOrders } from './orderTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = (page, size, sort, searchCategory, searchKeyword, orderStatus) => {
  return useQuery({
    queryKey: ['order', page, sort, searchCategory, searchKeyword, orderStatus],
    queryFn: () => getOrders(page, size, sort, searchCategory, searchKeyword, orderStatus),
  });
};
