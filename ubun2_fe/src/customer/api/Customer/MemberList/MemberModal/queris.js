import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMemberDetail, getMembers } from '../MemberTable/memberTable.js';
import { deleteMember } from './memberModal.js';
import { toast } from 'react-hot-toast';

export const useGetMemberDetail = (memberId, pending) => {
  return useQuery({
    queryKey: ['member', memberId, pending],
    queryFn: () => getMemberDetail(memberId, pending),
    enabled: memberId !== null && pending !== null,
    staleTime: 5000,
  });
};

export const useDeleteMember = (memberId, pending, currentPage) => {
  const queryClient = useQueryClient();
  console.log(memberId, pending, currentPage);

  return useMutation({
    mutationFn: () => deleteMember(memberId, pending),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member', currentPage] }); // TODO: 코너 케이스 - 해당 페이지의 마지막 row 라면 체크해서 하나 이전 페이지 갱신해야함
      toast.success('Member deleted successfully');
    },
    onError: error => {
      console.log('error', error);
      toast.error(`Failed to delete member: ${error.message}`);
    },
  });
};
