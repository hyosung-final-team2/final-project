import { create } from 'zustand';

const paymentMethodStore = create(set => ({
  paymentMethodType: 'ACCOUNT',
  setPaymentMethodType: type => set({ paymentMethodType: type }),
  selectedMemberId: null,
  setSelectedMemberId: memberId => set({ selectedMemberId: memberId }),
  isUpdate: false,
  setIsUpdate: state => set({ isUpdate: state }),
  openModal: false,
  setOpenModal: state => set({ openModal: state }),
  modalPaymentId: null,
  setModalPaymentId: id => set({ modalPaymentId: id }),
}));

export default paymentMethodStore;
