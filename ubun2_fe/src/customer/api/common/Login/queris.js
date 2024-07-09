import {login} from "./login.js";
import {useMutation} from "@tanstack/react-query";

export const useLogin = (loginObj,role) => {

    const loginData = {
        userType: role,
        loginId: loginObj.loginId,
        password: loginObj.password,
    }

    return useMutation({
        mutationFn: () => login(loginData),
        onSuccess: (response) => {
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
        },
        onError: (error) => {
            console.error("로그인 실패", error);
        }
    });
};