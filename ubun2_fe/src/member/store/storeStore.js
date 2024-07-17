import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreStore = create(
  persist(
    set => ({
      customerId: null,
      setCustomerId: state => set({ customerId: state }),
      currentStoreName: null,
      setCurrentStoreName: state => set({ currentStoreName: state }),

      scrollPosition: 0,
      setScrollPosition: (position) => set({ scrollPosition: position }),
    }),
    {
      name: 'store-storage',
    }
  )
);

export default useStoreStore;
