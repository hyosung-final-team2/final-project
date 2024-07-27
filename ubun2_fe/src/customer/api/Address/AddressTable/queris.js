import { getAddresses } from './addressTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetAddresses = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['address', page, size, sort, searchCategory, searchKeyword],
    queryFn: () => getAddresses(page, size, sort, searchCategory, searchKeyword),
  });
};
