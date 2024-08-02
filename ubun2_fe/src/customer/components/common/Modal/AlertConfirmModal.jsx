import {Modal} from "flowbite-react";
import {customConfirmModalTheme} from "./ModalStyle.js";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon.js";
import {useEffect} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";


const AlertConfirmModal = ({ isAlertConfirmModalOpen, setIsAlertConfirmModalOpen, text }) => {
    useEffect(() => {
        if (isAlertConfirmModalOpen) {
            const timer = setTimeout(() => {
                setIsAlertConfirmModalOpen(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isAlertConfirmModalOpen, setIsAlertConfirmModalOpen]);

    return (
        <Modal
            dismissible
            show={isAlertConfirmModalOpen}
            theme={customConfirmModalTheme}
            onClose={() => {
                setIsAlertConfirmModalOpen(false);
            }}
            size='lg'
        >
            <Modal.Body>
                <div className="flex flex-col items-center justify-center pt-5 pb-5 relative">
                    <ExclamationCircleIcon className="text-yellow-300 w-1/5 h-1/5"/>
                    {text}
                    <div className="absolute top-3 right-1">
                        <CountdownCircleTimer
                            isPlaying={isAlertConfirmModalOpen}
                            duration={3}
                            size={40}
                            strokeWidth={4}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[3, 2, 1, 0]}
                            onComplete={() => ({shouldRepeat: false})}
                        >
                            {({remainingTime}) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AlertConfirmModal