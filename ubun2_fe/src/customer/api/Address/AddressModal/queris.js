import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAddressDetail, deleteAddress, registerAddress, updateAddress } from './addressModal.js';
import { toast } from 'react-hot-toast';

export const useGetAddressDetail = addressId => {
  return useQuery({
    queryKey: ['address', { addressId: addressId }],
    queryFn: () => getAddressDetail(addressId),
    enabled: addressId !== null,
    staleTime: 5000,
    // enabled: !!addressId,
  });
};

export const useDeleteAddress = currentPage => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressId => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      toast.success('주소지를 성공적으로 삭제했습니다.');
    },
    onError: error => {
      toast.error(`Failed to delete Address: ${error.message}`);
    },
  });
};

export const useRegisterAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressData => registerAddress(addressData),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      toast.success('주소지를 성공적으로 등록했습니다.');
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: (addressId, addressData) => updateAddress(addressId, addressData),
  });
};
