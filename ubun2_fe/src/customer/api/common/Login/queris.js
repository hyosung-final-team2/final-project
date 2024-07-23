import {getStoreName, login} from "./login.js";
import {useMutation} from "@tanstack/react-query";
import useFCMTokenStore from "../../../../FCMTokenStore.js";
import {updateFcmToken} from "../../../../member/api/FcmToken/fcmToken.js";
import useMemberStore from "../../../../member/store/memberStore.js";
import useCustomerStore from "../../../store/customerStore.js";

export const useLogin = (loginObj,role) => {

    const loginData = {
        userType: role,
        loginId: loginObj.loginId,
        password: loginObj.password,
    }

    const {FCMToken} = useFCMTokenStore()
    const {setMemberId} = useMemberStore()
    const {setCustomerId} = useCustomerStore()
    const {setBusinessName} = useCustomerStore()

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
                    setMemberId(response.data.memberId)
                    console.log("FCM 토큰 업데이트 성공");
                } catch (error) {
                    console.error("FCM 토큰 업데이트 실패", error);
                }
            } else {
                await getStoreName(response.data.memberId).then( async (res) => {
                    await setBusinessName(res.data.data.businessName)
                })
                setCustomerId(response.data.memberId)
            }
        },
        onError: (error) => {
            console.error("로그인 실패", error);
        }
    });

};