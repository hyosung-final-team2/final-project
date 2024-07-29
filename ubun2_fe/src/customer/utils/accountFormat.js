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

export const formatBankAccount = (bankName, accountNumber) => {
  // bankName이 undefined인 경우 처리
  if (bankName === undefined) {
    return '';
  }

  // accountNumber가 undefined인 경우 처리
  if (accountNumber === undefined) {
    return '';
  }

  // 숫자만 추출
  const numbers = String(accountNumber).replace(/\D/g, '');

  switch (bankName) {
    case '국민':
      // 형식: 000000-00-000000
      if (numbers.length <= 6) {
        return numbers;
      } else if (numbers.length <= 8) {
        return `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
      } else {
        return `${numbers.slice(0, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 14)}`;
      }

    case '하나':
      // 형식: 000-000000-00000
      if (numbers.length <= 3) {
        return numbers;
      } else if (numbers.length <= 9) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 9)}-${numbers.slice(9, 14)}`;
      }

    case '우리':
      // 형식: 0000-000-000000
      if (numbers.length <= 4) {
        return numbers;
      } else if (numbers.length <= 7) {
        return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      } else {
        return `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 13)}`;
      }

    case '신한':
      // 형식: 000-000-000000
      if (numbers.length <= 3) {
        return numbers;
      } else if (numbers.length <= 6) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 12)}`;
      }

    case '농협':
      // 형식: 000-0000-0000-00
      if (numbers.length <= 3) {
        return numbers;
      } else if (numbers.length <= 7) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else if (numbers.length <= 11) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
      } else {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}-${numbers.slice(11, 13)}`;
      }

    case '카카오':
      // 형식: 0000-00-0000000
      if (numbers.length <= 4) {
        return numbers;
      } else if (numbers.length <= 6) {
        return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      } else {
        return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 13)}`;
      }

    default:
      return 'Unsupported bank';
  }
};
