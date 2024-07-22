/**
 * 계좌번호 형식화하는 함수
 * @param {string} accountNumber
 * @returns {string}
 */
export const formatAccountNumber = accountNumber => {
  const cleaned = accountNumber.replace(/\D/g, '');
  const formatted = cleaned.replace(/(\d{3})(?=\d)/g, '$1-');
  return formatted;
};

/**
 * 계좌번호를 마스킹하는 함수
 * @param {string} accountNumber
 * @returns {string}
 */
export const maskAccountNumber = accountNumber => {
  const cleaned = accountNumber.replace(/\D/g, '');
  const masked = cleaned.replace(/(\d{3})(\d+)(\d{4})/, '$1-****-$3');
  return masked;
};
