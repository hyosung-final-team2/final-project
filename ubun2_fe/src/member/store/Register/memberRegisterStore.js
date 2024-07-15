import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberRegisterStore = create(
    persist(
        set => ({
            registerStep: 1,
            // memberLoginId: '',
            // memberPassword:'',
            memberName:'',
            memberEmail:'',
            // memberPhone:'',
            setRegisterStep: state => set({ registerStep: state }),
            // setMemberLoginId: state => set({ memberLoginId: state }),
            // setMemberPassword: state => set({ memberPassword: state }),
            setMemberName: state => set({ memberName: state }),
            setMemberEmail: state => set({ memberEmail: state }),
            // setMemberPhone: state => set({ memberPhone: state }),

            resetStore: () =>
                set({
                    registerStep: 1,
                    memberName:'',
                    memberEmail:'',
                }),
        }),
        {
            name: 'memberRegister-storage',
        }
    )
);

export default useMemberRegisterStore;
