import {useGetNotifications} from "../../api/notification/queris.js";
import NotificationItem from "./NotificationItem.jsx";

const Notification = () => {

    const {data: notifications} = useGetNotifications()
    const notificationList = notifications?.data?.data

    return<>
    <div className="px-4">
        {notificationList?.length !== 0 ? notificationList?.map((notification) => {
            return <NotificationItem key={notification.id} {...notification} />
        }) : <div className="flex items-center justify-center p-4 py-7">미확인 알림이 없습니다</div>}

    </div>
    </>
}

export default Notification;