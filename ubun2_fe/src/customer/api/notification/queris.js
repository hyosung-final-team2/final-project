
// 1. 단건 알림
// - 주문 승인
// - title : "스토어 이름"
// - content : "주문번호 BC-${orderId}${random-5자리}가 승인되었습니다."
// - 주문 거절
// - title : "스토어 이름"
// - content : "주문번호 BC-${orderId}${random-5자리}가 승인 거절되었습니다. - TODO: 거절 사유 넣을지 말지 "

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAlarmList, readCustomerAlarm, sendGroupAlarm, sendPersonalAlarm} from "./notification.js";
import useCustomerStore from "../../store/customerStore.js";
import useNotificationStore from "../../store/Notification/notificationStore.js";

export const useSendPersonalAlarm = () => {
    const { businessName } = useCustomerStore()
    return useMutation({
        mutationFn: ([orders,isApproved]) => sendPersonalAlarm(orders,isApproved,businessName),
        onSuccess: () => {}
    })
}



export const useSendGroupAlarmProduct = (productName) => {
    const {customerId, businessName}= useCustomerStore()
    const BASE_URL = import.meta.env.VITE_PUSH_LINK
    const groupData = {
        customerId : customerId,
        title:businessName,
        content: `새상품(${productName})이 추가되었습니다.`,
        link: `${BASE_URL}/member/home`
    }
    return useMutation({
        mutationFn:() => sendGroupAlarm(groupData)
    })
}

export const useSendGroupAlarmProductDelete = (productName) => {
    const {customerId, businessName}= useCustomerStore()
    const groupData = {
        customerId : customerId,
        title:businessName,
        content: `상품(${productName})이 삭제되었습니다.`
    }
    return useMutation({
        mutationFn:() => sendGroupAlarm(groupData)
    })
}

export const useSendGroupAlarmAnnouncement = () => {
    const {customerId, businessName}= useCustomerStore()
    const BASE_URL = import.meta.env.VITE_PUSH_LINK
    const groupData = {
        customerId : customerId,
        title:businessName,
        content: "새로운 공지사항을 확인해보세요!",
        link: `${BASE_URL}/member/home`
    }
    return useMutation({
        mutationFn:() => sendGroupAlarm(groupData)
    })
}



export const useSendPersonalAlarmMember = (memberName) => {
    const {customerId, businessName}= useCustomerStore()
    const groupData = {
        customerId : customerId,
        title:businessName,
        content: `${memberName}이 삭제되었습니다.`
    }
    return useMutation({
        mutationFn:() => sendGroupAlarm(groupData)
    })
}

export const useGetAlarmList = (customerId) => {
    const {isRightBarOpen} = useNotificationStore()
    return useQuery({
        queryKey: ["notification", {customerId}],
        queryFn: () => getAlarmList(customerId),
        enabled: isRightBarOpen
    })
}

export const useReadCustomerAlarm = (alarmId) => {
    const queryClient = useQueryClient();
    const {customerId}= useCustomerStore()
    return useMutation({
        mutationFn: () => readCustomerAlarm(customerId, alarmId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['notification', {customerId}]})
        }
    })
}