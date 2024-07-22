import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberInsertStatusStore = create(
    persist(
        set => ({
            insertModalStatus: false,
            updateModalStatus: false,
            setInsertModalStatus:  state => set({ insertModalStatus: state }),
            setUpdateModalStatus: state => set({ updateModalStatus: state }),
        }),
        {
            name: 'memberInsertStatus-storage',
        }
    )
);

export default useMemberInsertStatusStore;
