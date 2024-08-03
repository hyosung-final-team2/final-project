import {Modal} from "flowbite-react";
import {customConfirmModalTheme} from "./ModalStyle.js";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon.js";


const CheckConfirmModal = ({isCheckConfirmModalOpen, setIsCheckConfirmModalOpen, text, secondText, firstButtonFunc, secondButtonFunc}) => {
    return (
        <Modal
            dismissible
            show={isCheckConfirmModalOpen}
            theme={customConfirmModalTheme}
            onClose={() => {
                setIsCheckConfirmModalOpen(false);
            }}
            size='lg'
        >

            <Modal.Body>
                <div className="flex flex-col items-center justify-center pt-5">
                    <CheckCircleIcon className="text-green-500 w-1/5 h-1/5 mb-3"/>
                    {text}
                    <p className="text-lg">정말 <span className="text-green-500 font-bold">{secondText}</span>하시겠습니까?</p>
                </div>

            </Modal.Body>

            <Modal.Footer>
                <button onClick={() => firstButtonFunc()} className="text-gray-500 bg-gray-300 rounded-lg py-2 px-12">취소</button>
                <button onClick={() => secondButtonFunc()} className="bg-green-500 text-white py-2 rounded-lg px-12">전송</button>
            </Modal.Footer>

        </Modal>
    )
}

export default CheckConfirmModal