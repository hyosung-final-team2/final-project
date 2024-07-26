/**
 * 숫자 or 숫자 형식의 문자열을 천 단위 구분자가 있는 형식으로 변환하는 함수
 * @param {number|string} amount
 * @returns {string}
 */
export const formatCurrency = amount => {
  if (amount == null || amount === '') {
    return '';
  }

  if (typeof amount === 'string') {
    amount = amount?.replace(/,/g, '');
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    return '';
  }

  const integerAmount = Math.floor(amount);

  return integerAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 천 단위 구분자가 있는 문자열을 숫자로 변환하는 함수
 * @param {*} amountString
 * @returns {number}
 */
export const parseCurrency = amountString => {
  if (amountString == null) {
    return NaN;
  }

  if (typeof amountString === 'number') {
    return amountString;
  }

  const cleanedString = amountString?.replace(/,/g, '');

  return parseFloat(cleanedString);
};
