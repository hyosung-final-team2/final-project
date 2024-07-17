import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFCMTokenStore = create(
    persist(
        set => ({
            FCMToken: 1,
            setFCMToken: state => set({ FCMToken: state }),
        }),
        {
            name: 'FCMToken-storage',
        }
    )
);

export default useFCMTokenStore;
