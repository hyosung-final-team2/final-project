/**
 * 계좌번호 형식화하는 함수
 * @param {string} accountNumber
 * @returns {string}
 */

export const formatAccountNumber = accountNumber => {
  const cleaned = accountNumber?.replace(/\D/g, '');
  const formatted = cleaned?.replace(/(\d{3})(?=\d)/g, '$1-');
  return formatted;
};

/**
 * 계좌번호를 마스킹하는 함수
 * @param {string} accountNumber
 * @returns {string}
 */
export const maskAccountNumber = accountNumber => {
  const cleaned = accountNumber?.replace(/\D/g, '');
  const masked = cleaned?.replace(/(\d{3})(\d+)(\d{4})/, '$1-****-$3');
  return masked;
};

/**
 * 은행별 계좌번호 형식화하는 함수
 * @param {string} bankName
 * @param {string} accountNumber
 * @returns {string}
 */
export const formatBankAccount = (bankName, accountNumber) => {
  // bankName이나 accountNumber가 undefined인 경우 처리
  if (bankName === undefined || accountNumber === undefined) {
    return '';
  }

  // 숫자만 추출
  const numbers = String(accountNumber).replace(/\D/g, '');

  // 기본 포맷팅 함수 (지원되지 않는 은행용)
  const defaultFormat = num => {
    if (num.length <= 3) return num;
    if (num.length <= 6) return `${num.slice(0, 3)}-${num.slice(3)}`;
    return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
  };

  switch (bankName) {
    case '국민':
      if (numbers.length <= 6) return numbers;
      if (numbers.length <= 8) return `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
      return `${numbers.slice(0, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 14)}`;

    case '하나':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 9)}-${numbers.slice(9, 14)}`;

    case '우리':
      if (numbers.length <= 4) return numbers;
      if (numbers.length <= 7) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 13)}`;

    case '신한':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 12)}`;

    case '농협':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}-${numbers.slice(11, 13)}`;

    case '카카오':
      if (numbers.length <= 4) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 13)}`;

    default:
      // 지원되지 않는 은행의 경우 기본 포맷팅 적용
      return defaultFormat(numbers);
  }
};
