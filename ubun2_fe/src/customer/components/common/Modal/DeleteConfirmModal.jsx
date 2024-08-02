import {Modal} from "flowbite-react";
import {customConfirmModalTheme} from "./ModalStyle.js";
import ExclamationTriangleIcon from "@heroicons/react/24/solid/esm/ExclamationTriangleIcon.js";


const DeleteConfirmModal = ({isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen, text, firstButtonFunc, secondButtonFunc}) => {
    return (
        <Modal
            dismissible
            show={isDeleteConfirmModalOpen}
            theme={customConfirmModalTheme}
            onClose={() => {
                setIsDeleteConfirmModalOpen(false);
            }}
            size='lg'
        >

            <Modal.Body>
                <div className="flex flex-col items-center justify-center pt-5">
                    <ExclamationTriangleIcon className="text-red-500 w-1/5 h-1/5 mb-3"/>
                    {text}
                    <p className="text-lg">정말 <span className="text-red-500 font-bold">삭제</span>하시겠습니까?</p>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button onClick={() => firstButtonFunc()} className="text-gray-500 bg-gray-300 rounded-lg py-2 px-12">취소</button>
                <button onClick={() => secondButtonFunc()} className="bg-red-500 text-white py-2 rounded-lg px-12">삭제</button>
            </Modal.Footer>

        </Modal>
    )
}

export default DeleteConfirmModal