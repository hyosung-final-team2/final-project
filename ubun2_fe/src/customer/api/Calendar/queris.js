import {useQuery} from "@tanstack/react-query";
import {getCalendarOrders, getMonthSummary} from "./calendar.js";

export const useGetCalendarOrders = (year,month) => {
    return useQuery({
        queryKey: ['calendar', year, month],
        queryFn: () => getCalendarOrders(year,month)
    })
}

export const useGetMonthSummary = (year,month) => {
    return useQuery({
        queryKey: ['calendar_summary', year, month],
        queryFn: () => getMonthSummary(year,month)
    })
}