import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {getMemberDetail} from '../MemberTable/memberTable.js';
import {deleteMember, registerMember, updateMember} from './memberModal.js';
import { toast } from 'react-hot-toast';
import error from "eslint-plugin-react/lib/util/error.js";

export const useGetMemberDetail = (memberId, pending) => {
  return useQuery({
    queryKey: ['member', memberId, pending],
    queryFn: () => getMemberDetail(memberId, pending),
    enabled: memberId !== null && memberId !== undefined && pending !== null && pending !== undefined,
    staleTime: 5000,
  });
};

export const useDeleteMember = (memberId, pending, currentPage) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMember(memberId, pending),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member', currentPage] }); // TODO: 코너 케이스 - 해당 페이지의 마지막 row 라면 체크해서 하나 이전 페이지 갱신해야함
      toast.success('정상적으로 삭제되었습니다.');
    },
    onError: error => {
      console.log('error', error);
      toast.error(`Failed to delete member: ${error.message}`);
    },
  });
};

export const useRegisterMember = (registerData, options) => {
  return useMutation({
    mutationFn: () => registerMember(registerData),
    onSuccess: () => {
      toast.success('회원 등록에 성공하였습니다.');
      if (options && options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      toast.error(`Member registration failed: ${error.message}`);
    },
  });
};

export const useUpdateMember = (currentPage) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({memberId, isPending, requestData}) => updateMember(memberId, isPending, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member', currentPage] });
      toast.success('회원 정보 수정에 성공하였습니다.')
    },
    onError: () => toast.error(`Member updated failed: ${error.message}`),
  })
}
