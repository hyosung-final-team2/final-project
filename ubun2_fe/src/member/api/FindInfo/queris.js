import {useMutation} from "@tanstack/react-query";
import {findLoginId} from "./findInfo.js";

export const useFindLoginId = () => {
    return useMutation({
        mutationFn: (findIdData) => findLoginId(findIdData)
    })
}