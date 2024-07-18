import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAddressStore = create(
  persist(
    set => ({
      memberId: JSON.parse(localStorage.getItem('member-storage')).state.memberId,
      setMemberId: id => set({ memberId: id }),
      selectedAddress: null,
      setSelectedAddress: address => set({ selectedAddress: address }),

      addressData: {
        name: '',
        recipientName: '',
        address: '',
        detailAddress: '',
        phoneNumber: '',
      },
      setAddressData: data =>
        set(state => ({
          addressData: { ...state.addressData, ...data },
        })),
      resetAddressData: () =>
        set({
          addressData: {
            name: '',
            recipientName: '',
            address: '',
            detailAddress: '',
            phoneNumber: '',
          },
        }),
    }),
    {
      name: 'address-storage',
    }
  )
);

export default useAddressStore;
