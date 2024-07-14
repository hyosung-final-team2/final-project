import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberStore = create(
  persist(
    set => ({
      memberId: 1,
      setMemberId: state => set({ memberId: state }),
    }),
    {
      name: 'member-storage',
    }
  )
);

export default useMemberStore;
