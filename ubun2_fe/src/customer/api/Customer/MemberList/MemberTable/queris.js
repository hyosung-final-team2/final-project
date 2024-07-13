import {getMembers, sendSms} from './memberTable.js';
import {useMutation, useQuery} from '@tanstack/react-query';
import {toast} from "react-hot-toast";

export const useGetMembers = (page, size) => {
  return useQuery({
    queryKey: ['member', page],
    queryFn: () => getMembers(page, size),
  });
};

export const useSendSms = (selectedMembers) => {
  const nameAndPhoneNumbers = selectedMembers.map((member) => {
    return { memberName: member.memberName, phoneNumber: member.memberPhone}
  })

  console.log(nameAndPhoneNumbers);

  return useMutation({
    mutationFn: () => sendSms(nameAndPhoneNumbers),
    onSuccess: () => toast.success(`${nameAndPhoneNumbers.length}명의 회원에게 성공적으로 전송되었습니다.`),
    onError: () => toast.error("링크 전송에 실패하였습니다.")
  })
}