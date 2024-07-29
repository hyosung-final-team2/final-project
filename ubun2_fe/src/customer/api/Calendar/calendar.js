import privateFetch from "../common/privateFetch.js";

export const getCalendarOrders = async (year,month) => await privateFetch.get("/calendar",{
    params : {
        year,
        month
    }
})

export const getMonthSummary = async (year,month) => await privateFetch.get("/calendar/summary", {
    params : {
        year,
        month
    }
})