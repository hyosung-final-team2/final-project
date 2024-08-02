import { create } from 'zustand';

const useDeleteConfirmModalStatusStore = create(set => ({
    isDeleteConfirmModalOpen: false,
    setIsDeleteConfirmModalOpen: status => set({ isDeleteConfirmModalOpen: status }),
}));

export default useDeleteConfirmModalStatusStore;