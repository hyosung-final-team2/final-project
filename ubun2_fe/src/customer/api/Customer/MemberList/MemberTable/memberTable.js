import privateFetch from '../../../common/privateFetch.js';

// 전체 회원 리스트 조회
export const getMembers = async (page, size) =>
  privateFetch.get('/customers/members', {
    params: {
      page: page - 1,
      size: size,
    },
  });

// 단일 회원 조회
export const getMemberDetail = async memberId => privateFetch.get(`/customers/members/${memberId}`);
