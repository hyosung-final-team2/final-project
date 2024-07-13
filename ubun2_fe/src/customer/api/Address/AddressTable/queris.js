import { getAddresses } from './addressTable.js';
import { registerAddress } from './registerAddress.js';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAddresses = (page, size) => {
  return useQuery({
    queryKey: ['address', { page: page }],
    queryFn: () => getAddresses(page, size),
  });
};

export const useRegisterAddress = () => {
  return useMutation({
    mutationFn: addressData => registerAddress(addressData),
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.log(error);
    },
  });
};
