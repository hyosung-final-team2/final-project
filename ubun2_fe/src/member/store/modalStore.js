import { create } from 'zustand';

const useModalStore = create(set => ({
  modalState: false,
  setModalState: state => set({ modalState: state }),
}));

export default useModalStore;
