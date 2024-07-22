import {useMutation} from "@tanstack/react-query";
import {memberSignup} from "./register.js";
import useMemberRegisterStore from "../../store/Register/memberRegisterStore.js";
import useFCMTokenStore from "../../../FCMTokenStore.js";

export const useMemberSignup = (memberLoginId, memberPassword, memberPhone) => {
    const { memberName, memberEmail } = useMemberRegisterStore(state => ({
        memberName: state.memberName,
        memberEmail: state.memberEmail,
    }));

    const {FCMToken}= useFCMTokenStore()

    const signupData = {
        memberName : memberName,
        memberEmail : memberEmail,
        memberPhone : memberPhone,
        memberPassword : memberPassword,
        memberLoginId : memberLoginId,
        fcmToken : FCMToken
    }

    return useMutation({
        mutationFn: () => memberSignup(signupData)
    })
}