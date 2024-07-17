import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreStore = create(
  persist(
    (set,get) => ({
      customerId: null,
      setCustomerId: state => set({ customerId: state }),
      currentStoreName: null,
      setCurrentStoreName: state => set({ currentStoreName: state }),

      isFirstTime : [],
      setIsFirstTime: (customerId) =>
        set((state) => ({
            isFirstTime: [...state.isFirstTime, customerId],
        })),

      scrollPositions: {},
      setScrollPosition: (id, position) => set({
        scrollPositions: { [id]: position } // Only keep the current customerId's position
      }),
      getScrollPosition: (id) => (get().scrollPositions[id] || 0),
    }),
    {
      name: 'store-storage',
    }
  )
);

export default useStoreStore;
