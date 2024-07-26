import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCustomerStore = create(
    persist(
        set => ({
            customerId: null,
            businessName: null,
            customerName: null,
            customerEmail:null,
            setCustomerId: state => set({ customerId: state }),
            setBusinessName: state => set({ businessName: state }),
            setCustomerName: state => set({ customerName: state }),
            setCustomerEmail: state => set({ customerEmail: state }),
        }),
        {
            name: 'customer-storage',
        }
    )
);

export default useCustomerStore;
