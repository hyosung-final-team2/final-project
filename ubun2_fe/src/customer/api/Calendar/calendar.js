import privateFetch from "../common/privateFetch.js";

export const getCalendarOrders = async (year,month) => await privateFetch.get("/calendar",{
    params : {
        year,
        month
    }
})