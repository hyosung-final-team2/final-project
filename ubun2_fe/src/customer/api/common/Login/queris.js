import {login} from "./login.js";
import {useMutation} from "@tanstack/react-query";
import useFCMTokenStore from "../../../../FCMTokenStore.js";
import {updateFcmToken} from "../../../../member/api/FcmToken/fcmToken.js";

export const useLogin = (loginObj,role) => {

    const loginData = {
        userType: role,
        loginId: loginObj.loginId,
        password: loginObj.password,
    }

    const {FCMToken} = useFCMTokenStore()

    return useMutation({
        mutationFn: () => login(loginData),
        onSuccess: async (response) => {
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
            if (role === "ROLE_MEMBER") {
                try {
                    await updateFcmToken(FCMToken);
                    console.log("FCM 토큰 업데이트 성공");
                } catch (error) {
                    console.error("FCM 토큰 업데이트 실패", error);
                }
            }
        },
        onError: (error) => {
            console.error("로그인 실패", error);
        }
    });

    // return useMutation({
    //     mutationFn: () => login(loginData),
    //     onSuccess: (response) => {
    //         const accessToken = response.headers['authorization'];
    //         if (accessToken) {
    //             localStorage.setItem('accessToken', accessToken);
    //         }
    //     },
    //     onError: (error) => {
    //         console.error("로그인 실패", error);
    //     }
    // });
};