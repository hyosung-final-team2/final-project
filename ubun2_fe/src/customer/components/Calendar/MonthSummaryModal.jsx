import {customModalTheme} from "../common/Modal/ModalStyle.js";
import {Modal} from "flowbite-react";

const MonthSummaryModal = ({isOpen,setOpenModal,currentMonth,previousMonth}) => {
    console.log(currentMonth);
    console.log(previousMonth);

    return  (
        <Modal
            dismissible
            show={isOpen}
            theme={customModalTheme}
            onClose={() => {
                setOpenModal(false);
            }}
            size='3xl'
        >
            <Modal.Header>
                <div className='text-xl font-bold'>월간 요약</div>
            </Modal.Header>

            <Modal.Body>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>

        </Modal>
            )
}

export default MonthSummaryModal