import {useMutation} from "@tanstack/react-query";
import {authEmail, checkDuplicateId, sendEmail} from "./register.js";

export const useSendEmail = (email) => {
    return useMutation({
        mutationFn: () => sendEmail(email)
    })
}

export const useAuthEmail = () => {
    return useMutation({
        mutationFn: ({email,authenticationNumber}) => authEmail(email, authenticationNumber)
    })
}

export const useCheckDuplicateId = () => {
    return useMutation({
        mutationFn: ({loginId, userType}) => checkDuplicateId(loginId, userType),
    })
}