import {useMutation} from "@tanstack/react-query";
import {logout} from "./logout.js";
import {useNavigate} from "react-router-dom";

export const useLogout = (role) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            localStorage.clear();
            if (role === "ROLE_CUSTOMER"){
                navigate("/customer/login")
            } else {
                navigate("/member/login")
            }

        }
    })
}