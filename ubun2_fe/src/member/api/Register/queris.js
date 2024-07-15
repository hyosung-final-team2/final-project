import {useMutation} from "@tanstack/react-query";
import {memberSignup} from "./register.js";
import useMemberRegisterStore from "../../store/Register/memberRegisterStore.js";

export const useMemberSignup = (memberLoginId, memberPassword, memberPhone) => {
    const { memberName, memberEmail } = useMemberRegisterStore(state => ({
        memberName: state.memberName,
        memberEmail: state.memberEmail,
    }));

    const signupData = {
        memberName : memberName,
        memberEmail : memberEmail,
        memberPhone : memberPhone,
        memberPassword : memberPassword,
        memberLoginId : memberLoginId,
    }

    return useMutation({
        mutationFn: () => memberSignup(signupData)
    })
}