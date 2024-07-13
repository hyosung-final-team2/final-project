import { create } from 'zustand';

const paymentMethodStore = create(set => ({
  paymentMethodType: 'ACCOUNT',
  setPaymentMethodType: type => set({ paymentMethodType: type }),
  selectedMemberId: null,
  setSelectedMemberId: memberId => set({ selectedMemberId: memberId }),
  isUpdate: false,
  setIsUpdate: state => set({ isUpdate: state }),
}));

export default paymentMethodStore;
