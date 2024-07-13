import { getAddresses } from './addressTable.js';
import { registerAddress } from '../AddressModal/addressModal.js';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAddresses = (page, size) => {
  return useQuery({
    queryKey: ['address', { page: page }],
    queryFn: () => getAddresses(page, size),
  });
};
