/**
 * 카드번호를 형식화하는 함수
 * @param {string} cardNumber
 * @returns {string}
 */

export const formatCardNumber = cardNumber => {
  const cleaned = cardNumber?.replace(/\D/g, '');
  const formatted = cleaned?.replace(/(\d{4})(?=\d)/g, '$1-');
  return formatted;
};

export const formatCardNumberWithSpace = cardNumber => {
  const cleaned = cardNumber?.replace(/\D/g, '');
  const formatted = cleaned?.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted;
};

/**
 * 카드번호를 마스킹하는 함수
 * @param {string} cardNumber
 * @returns {string}
 */
export const maskCardNumber = cardNumber => {
  const cleaned = cardNumber?.replace(/\D/g, '');
  const masked = cleaned?.replace(/(\d{6})(\d+)(\d{4})/, '$1-****-****-$3');
  return masked;
};
