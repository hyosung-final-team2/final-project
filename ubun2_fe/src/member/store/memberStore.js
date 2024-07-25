import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberStore = create(
  persist(
    set => ({
      memberId: null,
      memberName: null,
      setMemberId: state => set({ memberId: state }),
      setMemberName: state => set({ memberName: state }),
    }),
    {
      name: 'member-storage',
    }
  )
);

export default useMemberStore;
