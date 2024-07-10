import { getMembers } from './memberTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = (page, size) => {
  return useQuery({
    queryKey: ['member', page],
    queryFn: () => getMembers(page, size),
  });
};
