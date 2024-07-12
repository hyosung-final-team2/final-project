import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberUpdateStore = create(
    persist(
        set => ({
            isUpdateGlobal: false,
            deletedPaymentMethods: [],
            deletedAddresses: [],
            setIsUpdateGlobal: bool => set({ isUpdateGlobal: bool }),
            addDeletedPaymentMethod: method => set(state => ({
                deletedPaymentMethods: [...state.deletedPaymentMethods, method],
            })),
            addDeletedAddresses: address => set(state => ({
                deletedAddresses: [...state.deletedAddresses, address],
            })),
            resetDeletedPaymentMethods: () => set({ deletedPaymentMethods: [] }),
            resetDeletedAddresses: () => set({ deletedAddresses: [] }),
        }),
        {
            name: 'memberUpdate-storage',
        }
    )
);

export default useMemberUpdateStore;
