import {getAddresses, searchMember, getMemberAddresses, deleteSelectedAddresses} from './addressTable.js';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import useAddressTableStore from "../../../store/Address/addressTableStore.js";
import {toast} from "react-hot-toast";

export const useGetAddresses = (page, size, sort, searchCategory, searchKeyword) => {
  return useQuery({
    queryKey: ['address', page, size, sort, searchCategory, searchKeyword],
    queryFn: () => getAddresses(page, size, sort, searchCategory, searchKeyword),
  });
};

export const useSearchMember = (page, size, sort, searchKeyword) => {
  return useQuery({
    queryKey: ['searchMember', page, size, sort, searchKeyword],
    queryFn: () => {
      return searchMember(searchKeyword);
    },
    enabled: searchKeyword?.trim() !== '', // searchKeyword가 비어있지 않을 때만 쿼리 실행
  });
};

export const useGetMemberAddresses = memberId => {
  return useQuery({
    queryKey: ['address', { memberId }],
    queryFn: () => getMemberAddresses(memberId),
    enabled: !!memberId,
  });
};

export const useDeleteSelectedAddresses = (selectedAddresses, currentPage, size) => {
  const queryClient = useQueryClient();
  const {sort,searchCategory,searchKeyword } = useAddressTableStore()
  const count = selectedAddresses.length
  const convertSelectedAddresses = selectedAddresses.map((id) => ({
    addressId: id
  }));
  return useMutation({
    mutationFn: () => deleteSelectedAddresses(convertSelectedAddresses),
    onSuccess: () => {
      toast.success(`${count}개의 주소가 정상적으로 삭제되었습니다.`)
      queryClient.invalidateQueries({queryKey: ['address', currentPage, size, sort, searchCategory, searchKeyword]});
    },
    onError: () => toast.error("주소 삭제에 실패하였습니다.")
  })
}