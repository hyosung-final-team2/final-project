import privateFetch from "../../../customer/api/common/privateFetch.js";

export const updateFcmToken = async (fcmToken) => await privateFetch.put("/members/fcmtoken", {fcmToken})