import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAnnouncement, getProductDetail, getStores} from "./store.js";
import useStoreStore from "../../store/storeStore.js";

export const useGetStores =  () => {
    return useQuery({
        queryKey: ['stores'],
        queryFn: () => getStores()
    })
}

export const useGetProductDetail = (productId) => {
    const queryClient = useQueryClient();
    const {customerId} = useStoreStore()
    return useQuery({
        queryKey: ['products',{ productId }],
        queryFn: () => getProductDetail(customerId,productId),
        initialData: () => {
            const cachedData = queryClient.getQueryData(['products', { productId }]);
            if (cachedData) {
                return cachedData;
            }
        },
        staleTime: 1000 * 60 * 5,
    })
}

export const useGetAnnouncement = (customerId) => {
    return useQuery({
        queryKey: ['announcement',{customerId:customerId}],
        queryFn: () => getAnnouncement(customerId)
    })
}