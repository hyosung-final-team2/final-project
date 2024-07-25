import privateFetch from "../../../customer/api/common/privateFetch.js";

export const updateMemberFcmToken = async (fcmToken) => await privateFetch.put("/members/fcmtoken", {fcmToken})

export const updateCustomerFcmToken = async (fcmToken) => await privateFetch.put("/customers/fcmtoken", {fcmToken})