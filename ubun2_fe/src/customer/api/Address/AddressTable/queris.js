import { getAddresses, searchMember, getMemberAddresses } from './addressTable.js';
import { useQuery } from '@tanstack/react-query';

export const useGetAddresses = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['address', page, size, sort, searchCategory, searchKeyword],
    queryFn: () => getAddresses(page, size, sort, searchCategory, searchKeyword),
  });
};

export const useSearchMember = (page, size, sort, searchKeyword) => {
  return useQuery({
    queryKey: ['searchMember', page, size, sort, searchKeyword],
    queryFn: () => {
      return searchMember(searchKeyword);
    },
    enabled: searchKeyword?.trim() !== '', // searchKeyword가 비어있지 않을 때만 쿼리 실행
  });
};

export const useGetMemberAddresses = memberId => {
  return useQuery({
    queryKey: ['address', { memberId }],
    queryFn: () => getMemberAddresses(memberId),
    enabled: !!memberId,
  });
};
