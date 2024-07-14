/**
 * 날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 함수
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
