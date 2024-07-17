import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAddressStore = create(
  persist(
    set => ({
      selectedAddress: null,
      setSelectedAddress: address => set({ selectedAddress: address }),
    }),
    {
      name: 'address-storage',
    }
  )
);

export default useAddressStore;
