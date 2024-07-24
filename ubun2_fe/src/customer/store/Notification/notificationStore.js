import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotificationStore = create(
    persist(
        set => ({
            isRightBarOpen: false,
            setIsRightBarOpen: status => set({ isRightBarOpen: status }),
        }),
        {
            name: 'notification-storage',
        }
    )
);

export default useNotificationStore;
