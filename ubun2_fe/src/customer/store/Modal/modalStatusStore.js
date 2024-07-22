import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useModalStatusStore = create(
    persist(
        set => ({
            isExcelModalOpen: false,
            setIsExcelModalOpen: status => set({ isExcelModalOpen: status }),
        }),
        {
            name: 'modalStatus-storage',
        }
    )
);

export default useModalStatusStore;
