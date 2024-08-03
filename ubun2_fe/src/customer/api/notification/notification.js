import privateFetch from "../common/privateFetch.js";

export const sendPersonalAlarm = async (orders, isApproved, businessName) => {
    const BASE_URL = import.meta.env.VITE_PUSH_LINK

    const alarmDataList = orders.map(order => {
        return {
            targetMemberId: order.memberId,
            title : businessName,
            content : `${isApproved ? "주문 승인" : "주문 거절"} : ${!order.subscription ? "단건주문 " : "정기주문 "} BC-${order.orderId}`,
            link : `${BASE_URL}/member/app/mypage/${!order.subscription ? "single-order" : "subscription-order"}/${order.orderId}`
        };
    })

    await privateFetch.post("/customers/alarm/personal", alarmDataList);
}

export const sendGroupAlarm = async (groupData) => await privateFetch.post("/customers/alarm/group", groupData);

export const getAlarmList = async (customerId) => await privateFetch.get(`/customers/alarm/${customerId}`);

export const readCustomerAlarm = async (customerId, alarmId) => await privateFetch.delete(`/customers/alarm/${customerId}/${alarmId}`);