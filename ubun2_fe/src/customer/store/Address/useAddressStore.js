import { create } from 'zustand';

const useAddressStore = create(set => ({
  isEditMode: false,
  selectedAddress: null,
  setIsEditMode: mode => set({ isEditMode: mode }),
  setSelectedAddress: address => set({ selectedAddress: address }),
}));

export default useAddressStore;
