import axios from 'axios';
const apikey = import.meta.env.VITE_ADDRESS_SEARCH_API_KEY;

const fetchAddressData = (keyword, confmKey = apikey) => {
  const url = 'https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do';

  const params = new URLSearchParams({
    confmKey, // 실제 승인키로 교체해야 합니다
    currentPage: 1,
    countPerPage: 10,
    keyword, // 검색하고자 하는 주소 키워드
    resultType: 'json',
  });

  return axios
    .post(url, params)
    .then(response => {
      // JSONP 응답을 파싱하기 위해 정규식을 사용합니다
      const jsonpData = response.data;
      const jsonStartIndex = jsonpData.indexOf('(') + 1;
      const jsonEndIndex = jsonpData.lastIndexOf(')');
      const jsonString = jsonpData.substring(jsonStartIndex, jsonEndIndex);

      // JSON 문자열을 객체로 파싱
      const data = JSON.parse(jsonString);

      console.log(data);

      return data;
    })
    .catch(error => {
      console.error('에러 발생:', error);
      throw error;
    });
};

export default fetchAddressData;
