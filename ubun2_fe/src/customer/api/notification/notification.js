import privateFetch from "../common/privateFetch.js";

export const sendPersonalAlarm = async (isApproved,businessName,targetMemberId,orderType,link) => {
    const content = `${isApproved ? "주문 승인" : "주문 거절"} : ${orderType === "SINGLE" ? "단건주문 " : "정기주문 "} BC-${orderId}`

    const alarmData = {
        targetMemberId : targetMemberId,
        title: businessName,
        content: content,
        link: link
    }

    await privateFetch.post("/customers/alarm/personal", alarmData);
}

export const sendGroupAlarm = async (groupData) => await privateFetch.post("/customers/alarm/group", groupData);

export const getAlarmList = async (customerId) => await privateFetch.get(`/customers/alarm/${customerId}`);

export const readCustomerAlarm = async (customerId, alarmId) => await privateFetch.delete(`/customers/alarm/${customerId}/${alarmId}`);