import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaymentStore = create(
  persist(
    set => ({
      isEditPassword: false,
      setIsEditPassword: isEdit => set({ isEditPassword: isEdit }),
      resetEditPassword: () => set({ isEditPassword: false }),
    }),
    {
      name: 'payment-storage',
    }
  )
);

export default usePaymentStore;
