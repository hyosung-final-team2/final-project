import {useQuery} from "@tanstack/react-query";
import {getMemberDetail} from "../MemberTable/memberTable.js";

export const useGetMemberDetail = (memberId, pending) => {
    return useQuery({
        queryKey: ['member', memberId, pending],
        queryFn: () => getMemberDetail(memberId,pending),
        enabled: memberId !== null && pending !== null
    });
};
