import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getNotifications, readNotification} from "./notification.js";
import useMemberStore from "../../store/memberStore.js";

export const useGetNotifications = () => {
    const {memberId} = useMemberStore()
    return useQuery({
        queryKey: ['notification', {memberId}],
        queryFn: () => getNotifications(memberId),
    })
}

export const useReadNotification = (notificationId) => {
    const queryClient = useQueryClient();
    const {memberId} = useMemberStore()
    return useMutation({
        mutationFn: () => readNotification(memberId, notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['notification', {memberId}]})
        }
    })
}