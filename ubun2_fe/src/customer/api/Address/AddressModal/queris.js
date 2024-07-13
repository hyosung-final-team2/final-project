import { useQuery } from '@tanstack/react-query';
import { getAddressDetail } from './addressModal.js';

export const useGetAddressDetail = addressId => {
  return useQuery({
    queryKey: ['address', { addressId: addressId }],
    queryFn: () => getAddressDetail(addressId),
    enabled: addressId !== null,
    staleTime: 5000,
    // enabled: !!addressId,
  });
};
