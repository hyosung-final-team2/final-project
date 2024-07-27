import {getMembers, sendSms} from './memberTable.js';
import {useMutation, useQuery} from '@tanstack/react-query';
import {toast} from "react-hot-toast";

export const useGetMembers = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['member', page, sort, searchCategory, searchKeyword],
    queryFn: () => getMembers(page, size, sort, searchCategory, searchKeyword),
  });
};

export const useSendSms = (selectedMembers) => {
  const nameAndPhoneNumbers = selectedMembers?.map((member) => {
    return { memberName: member.memberName, phoneNumber: member.memberPhone}
  })

  return useMutation({
    mutationFn: () => sendSms(nameAndPhoneNumbers),
    onSuccess: () => toast.success(`${nameAndPhoneNumbers.length}명의 회원에게 성공적으로 전송되었습니다.`),
    onError: () => toast.error("링크 전송에 실패하였습니다.")
  })
}