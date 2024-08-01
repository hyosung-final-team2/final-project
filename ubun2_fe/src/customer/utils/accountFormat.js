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
// export const formatBankAccount = (bankName, accountNumber) => {
//   // bankName이나 accountNumber가 undefined인 경우 처리
//   if (bankName === undefined || accountNumber === undefined) {
//     return '';
//   }

//   // 숫자만 추출
//   const numbers = String(accountNumber).replace(/\D/g, '');

//   // 기본 포맷팅 함수 (지원되지 않는 은행용)
//   const defaultFormat = num => {
//     if (num.length <= 3) return num;
//     if (num.length <= 6) return `${num.slice(0, 3)}-${num.slice(3)}`;
//     return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
//   };

//   switch (bankName) {
//     case '국민':
//       if (numbers.length <= 6) return numbers;
//       if (numbers.length <= 8) return `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
//       return `${numbers.slice(0, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 14)}`;

//     case '하나':
//       if (numbers.length <= 3) return numbers;
//       if (numbers.length <= 9) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
//       return `${numbers.slice(0, 3)}-${numbers.slice(3, 9)}-${numbers.slice(9, 14)}`;

//     case '우리':
//       if (numbers.length <= 4) return numbers;
//       if (numbers.length <= 7) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
//       return `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 13)}`;

//     case '신한':
//       if (numbers.length <= 3) return numbers;
//       if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
//       return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 12)}`;

//     case '농협':
//       if (numbers.length <= 3) return numbers;
//       if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
//       if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
//       return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}-${numbers.slice(11, 13)}`;

//     case '카카오':
//       if (numbers.length <= 4) return numbers;
//       if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
//       return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 13)}`;

//     default:
//       // 지원되지 않는 은행의 경우 기본 포맷팅 적용
//       return defaultFormat(numbers);
//   }
// };

export const formatBankAccount = (bankName, accountNumber, mask = false) => {
  // bankName이나 accountNumber가 undefined인 경우 처리
  if (bankName === undefined || accountNumber === undefined) {
    return '';
  }

  // 숫자만 추출
  const numbers = String(accountNumber).replace(/\D/g, '');

  // 마스킹 함수
  const maskNumber = (num, showFront, showEnd) => {
    if (num.length <= showFront + showEnd) return num;
    return num.slice(0, showFront) + '*'.repeat(num.length - showFront - showEnd) + num.slice(-showEnd);
  };

  // 기본 포맷팅 및 마스킹 함수 (지원되지 않는 은행용)
  const defaultFormat = num => {
    if (num.length <= 3) return num;
    if (num.length <= 6) return `${num.slice(0, 3)}-${mask ? maskNumber(num.slice(3), 0, 0) : num.slice(3)}`;
    const masked = mask ? maskNumber(num, 3, 4) : num;
    return `${masked.slice(0, 3)}-${masked.slice(3, 6)}-${masked.slice(6)}`;
  };

  let formatted;
  switch (bankName) {
    case '국민':
      if (numbers.length <= 6) formatted = numbers;
      else if (numbers.length <= 8) formatted = `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
      else formatted = `${numbers.slice(0, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 14)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 6, 3).replace(/(\d{6})(\*+)(\d{3})/, '$1-$2-$3');
      break;

    case '하나':
      if (numbers.length <= 3) formatted = numbers;
      else if (numbers.length <= 9) formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      else formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 9)}-${numbers.slice(9, 14)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 3, 4).replace(/(\d{3})(\*+)(\d{4})/, '$1-$2-$3');
      break;

    case '우리':
      if (numbers.length <= 4) formatted = numbers;
      else if (numbers.length <= 7) formatted = `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      else formatted = `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 13)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 4, 3).replace(/(\d{4})(\*+)(\d{3})/, '$1-$2-$3');
      break;

    case '신한':
      if (numbers.length <= 3) formatted = numbers;
      else if (numbers.length <= 6) formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      else formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 12)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 3, 4).replace(/(\d{3})(\*+)(\d{4})/, '$1-$2-$3');
      break;

    case '농협':
      if (numbers.length <= 3) formatted = numbers;
      else if (numbers.length <= 7) formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      else if (numbers.length <= 11) formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
      else formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}-${numbers.slice(11, 13)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 3, 4).replace(/(\d{3})(\*+)(\d{4})/, '$1-$2-$3-$4');
      break;

    case '카카오':
      if (numbers.length <= 4) formatted = numbers;
      else if (numbers.length <= 6) formatted = `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
      else formatted = `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 13)}`;
      if (mask) formatted = maskNumber(formatted.replace(/-/g, ''), 4, 3).replace(/(\d{4})(\*+)(\d{3})/, '$1-$2-$3');
      break;

    default:
      // 지원되지 않는 은행의 경우 기본 포맷팅 적용
      formatted = defaultFormat(numbers);
  }

  return formatted;
};
