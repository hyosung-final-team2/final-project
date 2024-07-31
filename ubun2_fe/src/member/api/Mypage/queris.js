import { useQuery } from '@tanstack/react-query';
import { getMemberInfo } from '../../../customer/api/common/Login/login';

export const useGetMemberName = () => {
  return useQuery({
    queryKey: ['memberName'],
    queryFn: () => getMemberInfo(),
  });
};
