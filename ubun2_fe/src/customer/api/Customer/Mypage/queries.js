import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getMypage, updateMypage } from './mypage';

export const useGetMypage = () => {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: getMypage,
    staleTime: 5000,
  });
};

export const useUpdateMypage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mypageData => updateMypage(mypageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
    onError: error => {
      console.log('error', error);
    },
  });
};
