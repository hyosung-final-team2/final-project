import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const initialState = {
  sort: [],
  searchCategory: null,
  searchKeyword: null,
};

const usePaymentMethodModalStore = create(
  persist(
    set => ({
      ...initialState,
      setSearchCategory: state => set({ searchCategory: state }),
      setSearchKeyword: state => set({ searchKeyword: state }),

      selectedMember: null,
      setSelectedMember: state => set({ selectedMember: state }),
    }),
    {
      name: 'paymentModal-storage',
      partialize: state => ({
        searchCategory: state.searchCategory,
        searchKeyword: state.searchKeyword,
      }),
    }
  )
);

export default usePaymentMethodModalStore;
