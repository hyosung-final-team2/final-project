import {useGetAlarmList} from "../../api/notification/queris.js";
import useCustomerStore from "../../store/customerStore.js";
import NotificationItem from "./NotificationItem.jsx";

const NotificationList = () => {
    const {customerId} = useCustomerStore()

    const {data} = useGetAlarmList(customerId)
    const alarms = data?.data?.data

    return <>
        <div className="mt-4">
            {alarms?.map((alarm) => {
                return <NotificationItem key={alarm.id} {...alarm} />
            })}
        </div>
    </>
}

export default NotificationList;