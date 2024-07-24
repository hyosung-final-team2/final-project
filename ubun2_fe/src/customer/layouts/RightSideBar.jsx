import XMarkIcon  from '@heroicons/react/24/solid/XMarkIcon'
import useNotificationStore from "../store/Notification/notificationStore.js";
import NotificationList from "../components/Notification/NotificationList.jsx";

function RightSidebar(){

    const {isRightBarOpen, setIsRightBarOpen} = useNotificationStore()

    return(
        <div className={" fixed overflow-hidden z-20 bg-gray-400 bg-opacity-25 inset-0 transform ease-in-out " + (isRightBarOpen ? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")}>

            <section className={ "w-80 md:w-96  right-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform rounded-l-3xl " + (isRightBarOpen ? " translate-x-0 " : " translate-x-full ")}>

                <div className="relative  pb-5 flex flex-col  h-full">

                    {/* Header */}
                    <div className="navbar flex justify-between pl-4 pr-4">
                        <span className="ml-2 font-bold text-xl">주문 알림</span>
                        <button className="float-left btn-sm"
                                onClick={() => setIsRightBarOpen(false)}>
                            <XMarkIcon className="h-5 w-5"/>
                        </button>
                    </div>

                    {/* Content*/}
                    <div className="overflow-y-scroll pl-4 pr-4">
                        <div className="flex flex-col w-full">
                            <NotificationList/>
                        </div>
                    </div>

                </div>

            </section>

            <section className=" w-screen h-full cursor-pointer " onClick={() => setIsRightBarOpen(false)} >
            </section>
        </div>
    )
}

export default RightSidebar