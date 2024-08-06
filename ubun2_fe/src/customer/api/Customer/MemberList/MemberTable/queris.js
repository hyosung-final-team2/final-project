import {deleteSelectedMember, getMembers, sendSms} from './memberTable.js';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from "react-hot-toast";
import {formatPhoneNumber} from "../../../../utils/phoneFormat.js";

export const useGetMembers = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['member', page, sort, searchCategory, searchKeyword],
    queryFn: () => getMembers(page, size, sort, searchCategory, searchKeyword),
  });
};

export const useSendSms = (selectedMembers) => {
  const nameAndPhoneNumbers = selectedMembers?.map((member) => {
    return { memberName: member.memberName, phoneNumber: formatPhoneNumber(member.memberPhone)}
  })

  return useMutation({
    mutationFn: () => sendSms(nameAndPhoneNumbers),
    onSuccess: () => toast.success(`${nameAndPhoneNumbers.length}명의 회원에게 성공적으로 전송되었습니다.`),
    onError: () => toast.error("링크 전송에 실패하였습니다.")
  })
}

export const useDeleteSelectedMember = (selectedMembers, page, sort, searchCategory, searchKeyword) => {
  const queryClient = useQueryClient()
  const selectedMemberList = selectedMembers?.map((member) => {
    return { id: member.memberId, isPending: member.pending}
  })

  const count = selectedMembers?.length
  return useMutation({
    mutationFn: () => deleteSelectedMember(selectedMemberList),
    onSuccess: () => {
      toast.success(`${count}명의 회원이 정상적으로 삭제되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['member', page, sort, searchCategory, searchKeyword] });
    },
    onError: () => toast.error(`회원 삭제에 실패하였습니다.`)
  })
}