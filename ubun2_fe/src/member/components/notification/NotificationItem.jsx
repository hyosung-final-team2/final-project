import {useReadNotification} from "../../api/notification/queris.js";
import {useNavigate} from "react-router-dom";

const NotificationItem = ({id, title, content, timestamp, link, setIsAlarmOpen}) => {
    const navigate = useNavigate();

    const timeAgo = (timestamp) => {
        const now = new Date();
        const timeDifference = now - new Date(timestamp);

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return '방금 전';
        } else if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else {
            return `${days}일 전`;
        }
    }

    const {mutate: readMutate} = useReadNotification(id)

    const extractPath = (url) => {
        const parts = url?.split('/');
        const index = parts?.findIndex(part => part?.includes('clicknbuy.co.kr'));
        if (index === -1) {
            return '';
        }
        return '/' + parts?.slice(index + 1).join('/');
    }

    const handleNotificationClick = () => {
        readMutate()
        navigate(extractPath(link))
        setIsAlarmOpen(false)
    }

    return (
        <>
        <div className="flex items-center justify-between mb-4" onClick={() => handleNotificationClick()}>
            <div className="flex items-center gap-1">
                <span className="flex w-3 h-3 me-3 bg-purple-500 rounded-full"></span>
                <div className="flex flex-col">
                    <div className="font-bold">{title}</div>
                    <div className="text-gray-600">{content}</div>
                </div>
            </div>
            <div className="text-sm text-gray-400">{timeAgo(timestamp)}</div>
        </div>
        </>
    )
}
export default NotificationItem;