import {useMutation} from "@tanstack/react-query";
import {authEmail, sendEmail} from "./register.js";

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