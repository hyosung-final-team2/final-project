import privateFetch from '../../../common/privateFetch.js';

// 단일 회원 조회
export const getMemberDetail = async memberId => await privateFetch.get(`/customers/members/${memberId}`);

// 회원 삭제
export const deleteMember = async (memberId, pending) =>
    await privateFetch.delete(`/customers/members/${memberId}`, {
        data: {
            isPending: pending,
            request: null, // 현재 요청 본문은 비어있음
        },
    });

// 회원 등록
export const registerMember = async (registerData) => await privateFetch.post("/customers/members", {
    pendingMemberName:registerData.pendingMemberName,
    pendingMemberEmail:registerData.pendingMemberEmail,
    pendingMemberPhone:registerData.pendingMemberPhone
})

// 회원 정보 수정
export const updateMember = async (memberId, isPending, requestData) => {
    const requestPayload = {
        isPending: isPending,
        request: requestData
    };

    const res = await privateFetch.put(`/customers/members/${memberId}`, requestPayload);
    return res.data;
};