import { useQuery} from "@tanstack/react-query";
import {getAnnouncement, getProductDetail, getStores} from "./store.js";
import useStoreStore from "../../store/storeStore.js";

export const useGetStores =  () => {
    return useQuery({
        queryKey: ['stores'],
        queryFn: () => getStores()
    })
}

export const useGetProductDetail = (productId) => {
    const {customerId} = useStoreStore()
    return useQuery({
        queryKey: ['products',{productId:productId}],
        queryFn: () => getProductDetail(customerId,productId)
    })
}

export const useGetAnnouncement = (customerId) => {
    return useQuery({
        queryKey: ['announcement',{customerId:customerId}],
        queryFn: () => getAnnouncement(customerId)
    })
}