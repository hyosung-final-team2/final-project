import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderDataStore = create(
  persist(
    set => ({
      // 초기 상태
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
      // 선택된 주소 ID 설정
      setSelectedAddressId: addressId => set({ selectedAddressId: addressId }),

      // 선택된 결제 방법 ID 설정
      setSelectedPaymentMethodId: paymentMethodId => set({ selectedPaymentMethodId: paymentMethodId }),

      // 선택된 결제 방법 유형 설정
      setSelectedPaymentMethodType: paymentMethodType => set({ selectedPaymentMethodType: paymentMethodType }),

      // 주문 데이터 초기화
      resetOrderData: () =>
        set({
          orderData: [],
          selectedAddressId: null,
          selectedPaymentMethodId: null,
          selectedPaymentMethodType: null,
        }),
    }),
    {
      // 영속성 설정
      name: 'order-data-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useOrderDataStore;
