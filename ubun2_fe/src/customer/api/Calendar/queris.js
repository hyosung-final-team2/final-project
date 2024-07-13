import {useQuery} from "@tanstack/react-query";
import {getCalendarOrders} from "./calendar.js";

export const useGetCalendarOrders = (year,month) => {
    console.log(year,month)
    return useQuery({
        queryKey: ['calendar', year, month],
        queryFn: () => getCalendarOrders(year,month)
    })
}