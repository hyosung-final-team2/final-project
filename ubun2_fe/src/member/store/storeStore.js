import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreStore = create(
  persist(
    set => ({
      custormerId: null,
      setCustormerId: state => set({ custormerId: state }),
      currentStoreName: null,
      setCurrentStoreName: state => set({ currentStoreName: state }),
    }),
    {
      name: 'store-storage',
    }
  )
);

export default useStoreStore;
