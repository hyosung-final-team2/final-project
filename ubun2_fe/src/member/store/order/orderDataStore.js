import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderDataStore = create(
  persist(
    set => ({
      orderData: [],
      selectedAddressId: null,
      selectedPaymentMethodId: null,
      selectedPaymentMethodType: null,
      setOrderData: data => set({ orderData: data }),
      updateOrderData: updatedData =>
        set(state => ({
          orderData: state.orderData.map(item => ({
            ...item,
            ...updatedData,
          })),
        })),
      setSelectedAddressId: addressId => set({ selectedAddressId: addressId }),
      setSelectedPaymentMethodId: paymentMethodId => set({ selectedPaymentMethodId: paymentMethodId }),
      setSelectedPaymentMethodType: paymentMethodType => set({ selectedPaymentMethodType: paymentMethodType }),
      resetOrderData: () =>
        set({
          orderData: [],
          selectedAddressId: null,
          selectedPaymentMethodId: null,
          selectedPaymentMethodType: null,
        }),
    }),
    {
      name: 'order-data-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useOrderDataStore;
