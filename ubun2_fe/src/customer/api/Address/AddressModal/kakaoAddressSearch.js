import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const APIKEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export const useKakaoAddressSearch = query => {
  return useQuery({
    queryKey: ['kakaoAddress', query],
    queryFn: async () => {
      console.log(query);
      const encodedQuery = encodeURIComponent(query);
      const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodedQuery}`, {
        headers: {
          Authorization: `KakaoAK ${APIKEY}`,
        },
      });
      return response.data;
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
