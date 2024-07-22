import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCustomerStore = create(
    persist(
        set => ({
            customerId: null,
            businessName: null,
            setCustomerId: state => set({ customerId: state }),
            setBusinessName: state => set({ businessName: state }),
        }),
        {
            name: 'customer-storage',
        }
    )
);

export default useCustomerStore;
