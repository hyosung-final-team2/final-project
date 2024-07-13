import { create } from 'zustand';

const paymentMethodStore = create(set => ({
  paymentMethodType: 'ACCOUNT',
  setPaymentMethodType: type => set({ paymentMethodType: type }),
  selectedMemberId: null,
  setSelectedMemberId: memberId => set({ selectedMemberId: memberId }),
}));

export default paymentMethodStore;
