import { getMembers, getMemberDetail } from './memberTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = (page, size) => {
  return useQuery({
    queryKey: ['member', page],
    queryFn: () => getMembers(page, size),
  });
};

const useGetMemberDetail = memberId => {
  return useQuery({
    queryKey: ['member', { memberId: memberId }],
    queryFn: () => getMemberDetail(memberId),
  });
};
