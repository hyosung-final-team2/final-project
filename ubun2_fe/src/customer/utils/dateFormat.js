/**
 * 날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 함수
 * @param {string} dateString
 * @returns {string}
 */

import toast from 'react-hot-toast';
import { errorToastStyle } from '../../member/api/toastStyle';

export const formatDate = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateFromNumbers = input => {
  // input이 undefined이거나 빈 문자열인 경우 처리
  if (input === undefined || input === '') {
    return '**/**';
  }

  // 입력이 문자열이 아닌 경우 문자열로 변환
  const inputString = String(input);

  //toast로 알려줘야함
  // 입력이 숫자로만 이루어졌는지 확인
  if (!/^\d{1,4}$/.test(inputString)) {
    throw new Error('입력은 1에서 4자리의 숫자여야 합니다.');
  }

  let month = inputString.slice(0, 2).padEnd(2, '*');
  let year = inputString.length > 2 ? inputString.slice(2).padEnd(2, '*') : '**';

  // 월이 완전히 입력되었고 01에서 12 사이가 아닌 경우 에러 처리
  //toast로 알려줘야함 or 예외처리

  if (month !== '**' && (parseInt(month) < 1 || parseInt(month) > 12)) {
    toast.error('월은 01에서 12 사이여야 합니다.', errorToastStyle);
  }

  return `${month}/${year}`;
};
