import {useMutation} from "@tanstack/react-query";
import {findLoginId, findPassword, resetPassword} from "./findInfo.js";

export const useFindLoginId = () => {
    return useMutation({
        mutationFn: (findIdData) => findLoginId(findIdData)
    })
}

export const useFindPassword = () => {
    return useMutation({
        mutationFn: (findPasswordData) => findPassword(findPasswordData)
    })
}

export const useResetPassword = () => {
   return useMutation({
       mutationFn: (resetPasswordData) => resetPassword(resetPasswordData)
   })
}