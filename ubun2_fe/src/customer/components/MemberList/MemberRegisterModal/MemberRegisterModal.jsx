import {Modal} from "flowbite-react";
import {customModalTheme} from "../../common/Modal/ModalStyle.js";
import InputLabel from "../../common/Input/InputLabel.jsx";
import {useState} from "react";
import {useRegisterMember} from "../../../api/Customer/MemberList/MemberModal/queris.js";
import {formatPhoneNumber} from "../../../utils/phoneFormat.js";

const MemberRegisterModal = ({isOpen, setOpenModal, handleRegisterSuccess}) => {
    const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

    const [pendingMemberName,setPendingMemberName] = useState('');
    const [pendingMemberEmail, setPendingMemberEmail] = useState('');
    const [pendingMemberPhone, setPendingMemberPhone] = useState('');

    const handleMemberNameChange = (value) => setPendingMemberName(value);
    const handleMemberEmailChange = (value) => setPendingMemberEmail(value);
    const handleMemberPhoneChange = (value) => setPendingMemberPhone(value);

    const resetValues = () => {
        setPendingMemberName('')
        setPendingMemberEmail('')
        setPendingMemberPhone('')
    }

    const { mutate: memberRegisterMutate } = useRegisterMember({
        pendingMemberName,
        pendingMemberEmail,
        pendingMemberPhone: formatPhoneNumber(pendingMemberPhone),
    }, {
        onSuccess: () => {
            handleRegisterSuccess();
            setOpenModal(false);
            resetValues();
        }
    });

    return (
        <Modal
            dismissible
            show={isOpen}
            theme={customModalTheme}
            onClose={() => {
                setOpenModal(false);
                resetValues()
            }}
            size='2xl'
        >
            <Modal.Header>
                <div className='text-3xl font-bold'>회원 등록</div>
            </Modal.Header>

            <Modal.Body>
                <div className='flex flex-col gap-2'>
                    <InputLabel labelTitle='회원명' defaultValue={pendingMemberName} isUpdate={true} isOptional={false} onChange={handleMemberNameChange} placeholder="이름을 입력해주세요."/>
                    <InputLabel labelTitle='전화번호' defaultValue={pendingMemberPhone} isUpdate={true} isOptional={false} onChange={handleMemberPhoneChange}  placeholder="ex) 01012345678"/>
                    <InputLabel labelTitle='이메일' defaultValue={pendingMemberEmail} isUpdate={true} isOptional={false} onChange={handleMemberEmailChange} placeholder="이메일을 입력해주세요 "/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={ async () => {
                        await memberRegisterMutate()
                        setOpenModal(false);
                        resetValues()
                    }}
                    className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>등록
                </button>
                <button
                    onClick={() => {
                        resetValues()
                    }}
                    className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>취소
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default MemberRegisterModal