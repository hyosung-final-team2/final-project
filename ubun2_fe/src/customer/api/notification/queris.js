
// 1. 단건 알림
// - 주문 승인
// - title : "스토어 이름"
// - content : "주문번호 BC-${orderId}${random-5자리}가 승인되었습니다."
// - 주문 거절
// - title : "스토어 이름"
// - content : "주문번호 BC-${orderId}${random-5자리}가 승인 거절되었습니다. - TODO: 거절 사유 넣을지 말지 "

import {useMutation} from "@tanstack/react-query";
import {sendGroupAlarm, sendPersonalAlarm} from "./notification.js";
import useCustomerStore from "../../store/customerStore.js";

export const useSendPersonalAlarm = (targetMemberId, orderId, orderType, isApproved) => {
    const {businessName} = useCustomerStore()
    const content = `${isApproved ? "주문 승인" : "주문 거절"} : ${orderType === "SINGLE" ? "단건주문 " : "정기주문 "} BC-${orderId}`

    const alarmData = {
        targetMemberId : targetMemberId,
        title: businessName,
        content: content,
    }
    return useMutation({
        mutationFn: () => sendPersonalAlarm(alarmData),
    })
}


export const useSendGroupAlarmProduct = (productName) => {
    const {customerId, businessName}= useCustomerStore()
    const groupData = {
        customerId : customerId,
        title:businessName,
        content: `새상품(${productName})이 추가되었습니다.`
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