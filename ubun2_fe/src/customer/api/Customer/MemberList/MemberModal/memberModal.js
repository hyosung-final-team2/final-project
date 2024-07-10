import privateFetch from '../../../common/privateFetch.js';

// 단일 회원 조회
export const getMemberDetail = async memberId => await privateFetch.get(`/customers/members/${memberId}`);

export const deleteMember = async (memberId, pending) =>
  await privateFetch.delete(`/customers/members/${memberId}`, {
    data: {
      isPending: pending,
      request: null, // 현재 요청 본문은 비어있음
    },
  });
