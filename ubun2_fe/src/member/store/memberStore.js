import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberStore = create(
  persist(
    set => ({
      memberId: null,
      setMemberId: state => set({ memberId: state }),
    }),
    {
      name: 'member-storage',
    }
  )
);

export default useMemberStore;
