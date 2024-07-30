import privateFetch from '../../../common/privateFetch.js';
import qs from 'qs';

// 전체 회원 리스트 조회
export const getMembers = async (page, size, sort, searchCategory, searchKeyword) =>
  await privateFetch.get('/customers/members', {
    params: {
      page: page - 1,
      size: size,
      sort: sort, // 무조건 콤마! ["memberEmail", "memberName", "memberPhone", "createdAt"]
      searchCategory: searchCategory, //  null, "memberEmail", "memberName", "memberPhone", "createdAt"
      searchKeyword: searchKeyword, // null
    },
      paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
      }
  });

// 단일 회원 조회
export const getMemberDetail = async (memberId,pending) => await privateFetch.get(`/customers/members/${memberId}`,{
    params: {
        isPending: pending
    },
})

export const sendSms = async nameAndPhoneNumbers => await privateFetch.post(`/customers/sms`, nameAndPhoneNumbers)

export const deleteSelectedMember = async selectedMemberList => await privateFetch.delete('/customers/members/selected', {productIdList: selectedMemberList})