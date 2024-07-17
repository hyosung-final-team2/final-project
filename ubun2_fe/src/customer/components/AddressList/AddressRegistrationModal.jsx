import { Modal } from 'flowbite-react';
import { customModalTheme } from '../common/Modal/ModalStyle';
import AddressInput from '../common/Input/AddressInput';
import { useRegisterAddress } from '../../api/Address/AddressModal/queris';
import MemberInfo from '../common/Info/MemberInfo';
const AddressRegistrationModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { mutate: registerMutate } = useRegisterAddress();

  const handleSubmit = addressData => {
    registerMutate(addressData);
    setOpenModal(false);
  };

  return (
    <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} size='5xl' theme={customModalTheme}>
      <Modal.Header>
        <div className='text-3xl font-bold'>주소 등록</div>
      </Modal.Header>
      <Modal.Body>
        <MemberInfo title='회원정보' searchable={true} />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
          등록
        </button>
        <button onClick={() => setOpenModal(false)} className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressRegistrationModal;
