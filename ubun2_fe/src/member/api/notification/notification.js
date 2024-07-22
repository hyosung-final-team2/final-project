import privateFetch from "../../../customer/api/common/privateFetch.js";

export const getNotifications = async (memberId) => await privateFetch.get(`/members/alarm/${memberId}`)

export const readNotification = async (memberId, notificationId) => await privateFetch.delete(`/members/alarm/${memberId}/${notificationId}`)