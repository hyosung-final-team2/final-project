import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRegisterStepStore = create(
  persist(
    set => ({
      registerStep: 1,
      registerFirstData: {
        businessRegistrationNumber: '',
        businessOpenDate: '',
        businessAddressOwner: '',
      },
      registerSecondData: {
        customerName: '',
        email: '',
        emailAuthentication: '',
        customerId: '',
        customerPassword: '',
        customerPasswordCheck: '',
      },
      registerThirdData: {
        businessName: '',
        customerPhone: '',
        businessAddressNumber: '',
        businessAddressDefault: '',
        businessAddressDetail: '',
      },
      setRegisterStep: step => set({ registerStep: step }),
      setRegisterFirstData: newRegisterObj => set({ registerFirstData: newRegisterObj }),
      setRegisterSecondData: newRegisterObj => set({ registerSecondData: newRegisterObj }),
      setRegisterThirdData: newRegisterObj => set({ registerThirdData: newRegisterObj }),
      resetStore: () =>
        set({
          registerStep: 1,
          registerObj: {
            businessRegistrationNumber: '',
            businessOpenDate: '',
            businessAddressOwner: '',
          },
          registerSecondData: {
            customerName: '',
            email: '',
            emailAuthentication: '',
            customerId: '',
            customerPassword: '',
            customerPasswordCheck: '',
          },
          registerThirdData: {
            businessName: '',
            customerPhone: '',
            businessAddressNumber: '',
            businessAddressDefault: '',
            businessAddressDetail: '',
          },
        }),
    }),
    {
      name: 'registerStep-storage',
    }
  )
);

export default useRegisterStepStore;
