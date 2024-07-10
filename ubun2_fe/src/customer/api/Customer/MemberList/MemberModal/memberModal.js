import privateFetch from "../../../common/privateFetch.js";

// 단일 회원 조회
export const getMemberDetail = async memberId => await privateFetch.get(`/customers/members/${memberId}`);
