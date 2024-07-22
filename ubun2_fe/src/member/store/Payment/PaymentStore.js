import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaymentStore = create(
  persist(
    set => ({
      selectedCompany: null,
      setSelectedCompany: company => set({ selectedCompany: company }),
    }),
    {
      name: 'payment-storage',
    }
  )
);

export default usePaymentStore;
