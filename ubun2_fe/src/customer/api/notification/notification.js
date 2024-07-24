import privateFetch from "../common/privateFetch.js";

export const sendPersonalAlarm = async (alarmData) => await privateFetch.post("/customers/alarm/personal", alarmData);

export const sendGroupAlarm = async (groupData) => await privateFetch.post("/customers/alarm/group", groupData);

export const getAlarmList = async (customerId) => await privateFetch.get(`/customers/alarm/${customerId}`);