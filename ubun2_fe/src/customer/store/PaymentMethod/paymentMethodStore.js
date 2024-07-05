import { create } from 'zustand';

const paymentMethodStore = create(set => ({
  paymentMethodType: 'ACCOUNT',
  setPaymentMethodType: type => set({ paymentMethodType: type }),
}));

export default paymentMethodStore;
