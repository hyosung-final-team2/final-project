import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Persisted store
const createPersistedStore = set => ({
  memberId: JSON.parse(localStorage.getItem('member-storage'))?.state?.memberId || null,
  setMemberId: id => set({ memberId: id }),
});

// Non-persisted store
const createNonPersistedStore = set => ({
  selectedAddress: null,
  setSelectedAddress: address => set({ selectedAddress: address }),

  addressData: {
    name: '',
    recipientName: '',
    zipNo: '',
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
        zipNo: '',
        address: '',
        detailAddress: '',
        phoneNumber: '',
      },
    }),
});

// Combined store
const useAddressStore = create((...a) => ({
  ...persist(createPersistedStore, {
    name: 'address-storage',
  })(...a),
  ...createNonPersistedStore(...a),
}));

export default useAddressStore;
