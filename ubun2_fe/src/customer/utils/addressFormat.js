/**
 * 쉼표로 구분된 주소 문자열을 포맷팅된 주소 문자열로 변환하는 함수
 * @param {string} address
 * @returns {string}
 */
export const formatAddress = address => {
  if (!address) return '';
  const parts = address.split(',');

  const postalCode = parts[0].trim();
  const restOfAddress = parts
    .slice(1)
    .map(part => part.trim())
    .join(' ');
  return `${postalCode} ${restOfAddress}`;
};

/**
 * 쉼표로 구분된 주소 문자열을 우편번호, 시/도, 상세주소로 나누는 함수
 * @param {string} address
 * @returns {Object}
 */
export const splitAddress = address => {
  if (!address) return { postalCode: '', city: '', details: '' };
  const parts = address.split(',').map(part => part.trim());
  return {
    postalCode: parts[0] || '',
    city: parts[1] || '',
    details: parts.slice(2).join(' ') || '',
  };
};

/**
 * 쉼표로 구분된 주소 문자열을 3줄로 포맷팅하는 함수
 * @param {string} address
 * @returns {string}
 */
export const formatAddressThreeLines = address => {
  const { postalCode, city, details } = splitAddress(address);
  return `${postalCode}\n${city}\n${details}`;
};

/**
 * 쉼표로 구분된 주소 문자열을 1줄로 포맷팅하는 함수
 * @param {string} address
 * @returns {string}
 */
export const formatAddressOneLine = address => {
  const { postalCode, city, details } = splitAddress(address);
  return `${postalCode} ${city} ${details}`.trim();
};
