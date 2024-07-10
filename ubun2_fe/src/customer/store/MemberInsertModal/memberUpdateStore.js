import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberUpdateStore = create(
    persist(
        set => ({
            memberName: '',
            memberEmail:'',
            memberPhone:'',
            addresses: [],
            paymentMethods: [],
            setMemberName: memberName => set({ memberName: memberName }),
            setMemberEmail: memberEmail => set({ memberName: memberEmail }),
            setMemberPhone: memberPhone => set({ memberName: memberPhone }),
            setAddresses: newCard => set(state => ({ cardList: [...state.cardList, newCard] })),
            setAccountList: newAccount => set(state => ({ accountList: [...state.accountList, newAccount] })),
        }),
        {
            name: 'memberUpdate-storage',
        }
    )
);

export default useMemberUpdateStore;
