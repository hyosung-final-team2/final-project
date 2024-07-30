import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyAddresses, registerAddress, deleteAddress, updateAddress, setDefaultAddress } from './addresses';

export const useGetMyAddresses = memberId => {
  return useQuery({
    queryKey: ['myAddresses', { memberId: memberId }],
    queryFn: () => getMyAddresses(),
  });
};

export const useRegisterAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => registerAddress(data),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
      console.log(response);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, data }) => updateAddress(addressId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressId => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
    },
    onError: error => {
      console.log('error', error);
    },
  });
};

export const useSetDefaultAddressStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressId => setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
    },
    onError: error => {
      console.log('error', error);
    },
  });
};
